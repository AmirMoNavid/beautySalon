"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import PickServices from "../components/reserve/pickServices";
import { reserveStore } from "../config/store/reserveStore";
import PickDate from "../components/reserve/pickDate";
import "./style.css";
import Info from "../components/reserve/info";
import Confirm from "../components/reserve/confirm";
import axios from "axios";
import { END_POINTS } from "../config/store/endPoints";
import { useStore } from "../config/store/use-hooks";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

function Reserve() {
  const { step, setStep, isSelected, name, service, number, date, time } =
    reserveStore();

  const { baseUrl } = useStore();

  useEffect(() => {
    const navbar = document.getElementById("header");
    const path = window.location.pathname;
    if (path !== "/") {
      navbar.style.background = "rgb(0 0 0 / 90%)";
      navbar.style.backdropFilter = "blur(2px)";

      return;
    }
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll(".item");
    items.forEach((item, i) => {
      const isActive = item.classList.contains(`item-${step}`);
      if (isActive) {
        item.style.fontWeight = "bold";
        item.style.opacity = "100%";
      } else {
        item.style.fontWeight = "500";
        item.style.opacity = "50%";
      }
    });
  }, [step]);

  async function createReserve() {
    try {
      const data = {
        reserveTime: time,
        reserveDate: date,
        service,
        name,
        number,
      };

      const res = await axios.post(
        `${baseUrl}${END_POINTS.CREATE_RESERVE}`,
        data
      );
      toast("رزرو شما با موفقیت ثبت شد", {
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
        type: "success",
      });

      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div
        className={`flex w-3/4  ${
          step == 2 ? "h-[500px] md:h-[400px]" : "h-[400px]"
        }  flex-col md:flex-row  mx-auto items-center justify-center mt-[122px] mb-14 md:mb-8`}
      >
        <div className="hidden md:flex w-1/4 h-[110%] bg-[#272727] text-gray-100 p-4  flex-col gap-4">
          <ul className="space-y-4">
            <li className="font-bold item item-1">۱. سرویس</li>
            <li className="opacity-50 item item-2">۲. تاریخ و زمان</li>
            <li className="opacity-50 item item-3">۳. اطلاعات</li>
            <li className="opacity-50 item item-4">۴. تأیید</li>
          </ul>
        </div>
        <div className="w-full flex flex-col h-full relative items-center md:items-start">
          {step == 1 ? (
            <PickServices />
          ) : step == 2 ? (
            <PickDate />
          ) : step == 3 ? (
            <Info />
          ) : (
            <Confirm />
          )}
          <div
            className={`p-2 pb-3 mb-4 absolute bottom-[-9%] w-full flex justify-${
              step == 1 ? "end" : "between"
            } bg-[#8b8b8b]`}
          >
            <button
              onClick={() => setStep(step - 1)}
              className={`${
                step == 1 ? "hidden" : ""
              } cursor-pointer  bg-black transition text-white px-6 py-2 rounded hover:bg-white hover:text-black`}
            >
              بازگشت
            </button>
            <button
              disabled={!isSelected}
              onClick={(e) => {
                if (step == 4) return createReserve();
                setStep(step + 1);
              }}
              className={`disabled:opacity-50 disabled:hover:bg-black disabled:hover:text-white cursor-pointer bg-black transition text-white px-6 py-2 rounded hover:bg-white hover:text-black`}
            >
              {step == 4 ? "تایید" : "گام بعدی"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Reserve;
