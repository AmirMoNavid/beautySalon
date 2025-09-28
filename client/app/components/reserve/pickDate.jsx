"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { reserveStore } from "@/app/config/store/reserveStore";

export default function PickDate() {
  const { date, setDate, setTime, time, isSelected, setIsSelected } =
    reserveStore();
  const [selectedTime, setSelectedTime] = useState(null);
  const times = [
    "08:00 - 10:00",
    "10:00 - 12:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "18:00 - 20:00",
  ];

  function handleChange(value) {
    setDate(`${value.day} ${value.month.name}`);
  }

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    setTime(time);
  };

  useEffect(() => {
    if (date !== "" && time !== "") {
      setIsSelected(true);
    }
  }, [date, time]);

  return (
    <div className="flex flex-col md:flex-row w-full h-max md:h-full items-center md:items-center gap-2 md:gap-0 ">
      <Calendar
        className="calendar"
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
      <div className="time-picker h-full bg-white p-4  ">
        <div className="time-picker-header border-b pb-2">
          {date || "تاریخ انتخاب نشده"}
        </div>
        <div className="time-grid">
          {times.map((time) => (
            <button
              key={time}
              className={`time-button shadow ${
                selectedTime === time ? "selected" : ""
              }`}
              onClick={() => handleTimeClick(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
