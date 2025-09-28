"use client";
import { END_POINTS } from "@/app/config/store/endPoints";
import { useStore } from "@/app/config/store/use-hooks";
import React, { useState, useEffect } from "react";
import Comments from "./comments";
import EdcServices from "./edcServices";
import Services from "./services";
import axios from "axios";
import { useRouter } from "next/navigation";

function OwnerAndsalon() {
  const [details, setDetails] = useState({});
  const { baseUrl, host, setSalon, setGallery, gallery, salon } = useStore();
  const router = useRouter();

  async function getDatails() {
    try {
      const { data } = await axios.get(
        `${baseUrl}${END_POINTS.GET_OWNERDETAILS}`
      );

      console.log(data);

      setDetails(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getGallery() {
    try {
      const { data } = await axios.get(`${baseUrl}${END_POINTS.GALLERY}`);

      setGallery(data);

      window.scrollTo(0, 0);
    } catch (err) {
      console.log(err);
    }
  }
  async function getSalon() {
    try {
      const { data } = await axios.get(`${baseUrl}${END_POINTS.SALON}`);

      setSalon(data);

      window.scrollTo(0, 0);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getDatails();
    getGallery();
    getSalon();
  }, []);

  return (
    <div className="flex flex-col w-full mb-4  md:p-0 ">
      {details ? (
        <>
          <div
            className="w-full headImage h-[300px] md:h-[450px] "
            style={{
              backgroundImage: `linear-gradient(rgb(0 0 0 / 50%), rgb(0 0 0 / 50%)),
    url(${host}${details.url2})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
          <h2 className="text-center font-bold md:font-normal md:text-3xl w-full md:w-1/2 mx-auto my-6 text-[#777]">
            {details.aboutsalon}
          </h2>
          <div className="owner-box flex flex-col md:flex-row items-center md:items-start justify-center gap-8 my-4 section ">
            <div
              className="w-full h-[400px] md:max-w-[35%] md:h-[450px] bg-top bg-cover"
              style={{ backgroundImage: `url(${details.url})` }}
            ></div>

            <div className="w-[90%]  md:w-1/3 mt-[5%]  ">
              <h2 className="font-bold text-2xl md:text-3xl text-center title relative mb-4">
                درباره مدیریت سالن زیبایی آرمیس
              </h2>
              <p className="md:text-xl">{details.aboutowner}</p>
              <button
                onClick={() => router.push("/gallery")}
                className="p-2 px-5 w-full bg-slate-600 text-white transition hover:text-black hover:bg-slate-300 cursor-pointer rounded-md mb-4 md:mb-0 mt-[10%]"
              >
                مشاهده نمونه کار ها
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      <div
        className="my-2 h-[400px] flex items-center justify-center text-center px-2 w-full bg-center bg-cover text-white font-bold"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 80%), rgba(0, 0, 0, 53%)), url(${host}${
            salon[salon.length - 1]?.url
          })`,
        }}
      >
        آکادمی زیبایی آرمیس تا به حال حدودا 400 هنرجو را آموزش داده و با حمایت و
        ﭘشتیبانی خود بعد از گذراندن دوره های آموزشی بسیاری از هنرجویان وارد
        بازار کار شده اند.
      </div>
      <div className=" flex flex-col-reverse md:flex-row items-center md:items-start  justify-center gap-8 my-4 section ">
        <div className="w-[90%]  md:w-1/3 mt-[5%]  ">
          <h2 className="font-bold text-2xl md:text-3xl text-center title relative mb-4">
            گالری ما
          </h2>
          <p className="md:text-xl">
            در گالری ما بهترین عکس های ما در زمینه مو را مشاهده کنید. ما در دو
            بخش آموزش و خدمات مو در حال فعالیت هستیم که شما میتوانید نمونه کار
            های ما را در قسمت گالری مشاهده کنید
          </p>
          <button
            onClick={() => router.push("/gallery")}
            className="p-2 px-5 w-full bg-slate-600 text-white transition hover:text-black hover:bg-slate-300 cursor-pointer rounded-md mb-4 md:mb-0 mt-[10%]"
          >
            مشاهده گالری
          </button>
        </div>
        <div
          className="w-full h-[400px] md:max-w-[35%] md:h-[450px] bg-center bg-cover"
          style={{
            backgroundImage: `url(${host}${gallery[gallery.length - 1]?.url})`,
          }}
        ></div>
      </div>
      <EdcServices />
      <Services />
      <div className=" flex flex-col-reverse md:flex-row items-center md:items-start   justify-center gap-4 my-4 section ">
        <div
          className="w-full h-[300px] md:max-w-[25%] md:h-[450px] bg-top bg-cover md:block hidden"
          style={{
            backgroundImage: `url(${host}${salon[salon.length - 1]?.url})`,
          }}
        ></div>
        <div className="w-[90%]  md:w-1/3 mt-[5%]  ">
          <h2 className="font-bold text-2xl md:text-3xl text-center title relative mb-4">
            سالن
          </h2>
          <p className="md:text-xl">
            مهم نیست برای چه کاری وارد سالن زیبایی آرمیس می‌شوید. از انجام
            آرایش‌ها و اصلاح‌های دوره‌ای گرفته تا خدمات ویژه وی آی پی عروس،‌
            برای شما محیطی مجلل، شیک و آراسته در نظر گرفته‌ایم تا با فراغ بال و
            بدون استرس، به کارهای خود برسید
          </p>
          <button
            onClick={() => router.push("/salon")}
            className="p-2 px-5 w-full bg-slate-600 text-white transition hover:text-black hover:bg-slate-300 cursor-pointer rounded-md mb-4 md:mb-0 mt-[10%]"
          >
            مشاهده عکس های سالن
          </button>
        </div>
        <div
          className="w-full h-[400px] md:max-w-[25%] md:h-[450px] bg-top bg-cover"
          style={{
            backgroundImage: `url(${host}${salon[salon.length - 2]?.url})`,
          }}
        ></div>
      </div>
      <Comments />
    </div>
  );
}

export default OwnerAndsalon;
