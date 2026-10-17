"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { toast } from "react-toastify";
import { reserveStore } from "@/app/config/store/reserveStore";
import { useStore } from "@/app/config/store/use-hooks";
import { END_POINTS } from "@/app/config/store/endPoints";

export default function PickDate() {
  const { date, setDate, setTime, time, serviceId, setIsSelected } =
    reserveStore();

  const today = new DateObject({ calendar: persian, locale: persian_fa });

  const { baseUrl } = useStore();

  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(time || null);
  const [loading, setLoading] = useState(false);

  function handleChange(value) {
    if (!value) return;

    const formattedDate = [
      value.year,
      String(value.month.number).padStart(2, "0"),
      String(value.day).padStart(2, "0"),
    ].join("/");

    setDate(formattedDate);
    setTime("");
    setSelectedTime(null);
    setAvailableTimes([]);
    setIsSelected(false);
  }

  useEffect(() => {
    if (!date) {
      setAvailableTimes([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchAvailableTimes() {
      setLoading(true);
      setAvailableTimes([]);

      if (!date || !serviceId) {
        setAvailableTimes([]);
        setLoading(false);
        return;
      }
      try {
        const { data } = await axios.get(
          `${baseUrl}${END_POINTS.AVAILABLE_RESERVE_TIMES}`,
          {
            params: {
              date,
              serviceId,
            },
          },
        );

        if (!cancelled) {
          setAvailableTimes(data.availableTimes ?? []);
        }
      } catch (error) {
        if (!cancelled) {
          setAvailableTimes([]);
          toast.error("دریافت تایم‌های آزاد ناموفق بود");
          console.error(error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchAvailableTimes();

    return () => {
      cancelled = true;
    };
  }, [date, serviceId, baseUrl]);

  function handleTimeClick(selected) {
    setSelectedTime(selected);
    setTime(selected);
    setIsSelected(true);
  }

  return (
    <div className="flex h-[93%] flex-col md:flex-row w-full overflow-auto py-1.5 md:h-full items-center gap-2 md:gap-0">
      <Calendar
        className="calendar"
        minDate={today}
        mapDays={({ date }) => {
          if (date.weekDay.index === 6) {
            return {
              disabled: true,
              style: { color: "#ccc" },
            };
          }

          return {};
        }}
        onChange={handleChange}
        calendar={persian}
        locale={persian_fa}
      />

      <div className="time-picker h-full bg-white p-4">
        <div className="time-picker-header border-b pb-2">
          {date || "تاریخ انتخاب نشده"}
        </div>

        {!date ? (
          <p className="py-4 text-gray-500">ابتدا یک تاریخ انتخاب کنید</p>
        ) : loading ? (
          <p className="py-4 text-gray-500">در حال دریافت تایم‌های آزاد...</p>
        ) : availableTimes.length === 0 ? (
          <p className="py-4 text-gray-500">
            در این تاریخ تایم آزادی وجود ندارد
          </p>
        ) : (
          <div className="time-grid">
            {availableTimes.map((availableTime) => (
              <button
                key={availableTime}
                type="button"
                className={`time-button shadow ${
                  selectedTime === availableTime ? "selected" : ""
                }`}
                onClick={() => handleTimeClick(availableTime)}
              >
                {availableTime}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
