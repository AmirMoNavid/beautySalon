"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { socialLinks } from "../../data/socialLinks";
import dynamic from "next/dynamic";
import "./footer.css";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useStore } from "@/app/config/store/use-hooks";
import { END_POINTS } from "@/app/config/store/endPoints";

const Footer = () => {
  const { baseUrl } = useStore();
  const DynamicMap = dynamic(() => import("./map"), { ssr: false });
  const [numbers, setNumbers] = useState([]);
  const router = useRouter();

  async function getNumbers() {
    try {
      const { data } = await axios.get(`${baseUrl}${END_POINTS.GET_NUMBERS}`);

      setNumbers(data);
    } catch (err) {
      console.log(err);
    }
  }

  const path = usePathname();

  const isAdminPage = path.startsWith("/admin");

  if (isAdminPage) return;
  useEffect(() => {
    getNumbers();
  }, []);
  return (
    <footer className="footer text-sm text-center md:text-start p-7">
      <div className="container-footer">
        <div className="columns flex-col md:flex-row flex ">
          <div className="column is-one-third p-[0.75rem]">
            <div className="logo-footer pb-[50px] justify-center">
              <Link href="/">
                <img src={"/logo.png"} alt="Logo" />
              </Link>
            </div>

            <h1 className="footer-titr-desc">درباره ما:</h1>
            <div className="footer-desc">
              <p>
                سالن زیبایی واقع در شهر تهران
                <br></br>
                <br></br>
                آدرس : فلکه دوم صادقیه اشرفی اصفهانی ؛؛ (نرسیده به بلوار
                مرزداران ) برج نگین رضا طبقه دهم جنوبی
              </p>
            </div>
          </div>

          <div className="column is-one-third p-[0.75rem]">
            <div className="peivandha">
              <h1 className="footer-titr-desc mb-3">رزرو:</h1>
              <button
                onClick={() => router.push("/reserve")}
                className="w-[80%] text-white transition hover:bg-slate-800  rounded-md p-2 px-8 text-center bg-slate-600 cursor-pointer "
              >
                رزرو تایم سالن
              </button>
              <ul className="numbers">{}</ul>
            </div>
            <div className="peivandha flex-col flex gap-2  items-center md:items-start mt-3">
              <h1 className="footer-titr-desc mb-3">شماره های تماس</h1>
              {numbers?.map((number, i) => (
                <a
                  key={i}
                  href={`tel:${number.number}`}
                  className="w-[80%] text-white transition hover:bg-slate-800  rounded-md p-2 px-8 text-center bg-slate-600 cursor-pointer "
                >
                  {number.number}
                </a>
              ))}
            </div>
          </div>

          <div className="column is-one-third p-[0.75rem]">
            <DynamicMap />
          </div>
        </div>
        <div className="columns bottom-header mt-6  text-center is-flex is-justify-content-center justify-center">
          <h1>
            تمام حقوق مادی و معنوی سایت متعلق به
            <Link
              href="/"
              className="mx-2 inline-block"
              style={{ color: "#faff15" }}
            >
              سالن زیبایی آرمیس
            </Link>
            میباشد.
          </h1>
        </div>
        <div
          style={{ marginTop: "10px" }}
          className="border-t border-white pt-2 md:my-2 columns bottom-header mt-6 text-center is-flex is-justify-content-center justify-center text-white"
        >
          تهیه کننده : مهندس صالح خدایاری
        </div>
      </div>
    </footer>
  );
};

export default Footer;
