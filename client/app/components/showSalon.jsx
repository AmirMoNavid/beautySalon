import { useRouter } from "next/navigation";
import React from "react";

function ShowSalon() {
  const router = useRouter();
  return (
    <div
      className="p-4 pb-6 w-full  last-news h-max mb-2 md:mb-0  md:my-[40px] "
      style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px 0px" }}
    >
      <div className="tpg-header-wrapper w-full pr-2 mt-3">
        <div className="tpg-widget-heading-wrapper rt-clear heading-style4 ">
          <span className="tpg-widget-heading-line line-left"></span>
          سالن
          <span className="tpg-widget-heading-line line-right"></span>
        </div>
      </div>
      <div>
        <p
          onClick={() => router.push("/salon")}
          className="cursor-pointer pb-1 p-1 text-sm transition hover:text-blue-600"
        >
          مهم نیست برای چه کاری وارد سالن زیبایی ما می‌شوید. از انجام آرایش‌ها و
          اصلاح‌های دوره‌ای گرفته تا خدمات ویژه وی آی پی عروس،‌ برای شما محیطی
          مجلل، شیک و آراسته در نظر گرفته‌ایم تا با فراغ بال و بدون استرس، به
          کارهای خود برسید
        </p>
      </div>
      <button
        onClick={() => router.push("/salon")}
        className="p-2 px-5 w-full bg-slate-600 text-white transition hover:text-black hover:bg-slate-300 cursor-pointer rounded-md mb-4 md:mb-0 mt-[10%]"
      >
        مشاهده عکس های سالن
      </button>
    </div>
  );
}

export default ShowSalon;
