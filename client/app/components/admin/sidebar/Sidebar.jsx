import React, { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/app/config/contexts/authContext";
import "./sidebar.css";
const Sidebar = () => {
  const [showNews, setShowNews] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showOwner, setShowOwner] = useState(false);
  const [showEdcServices, setShowEdcServices] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showSalon, setShowSalon] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showNumbers, setShowNumbers] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showReservs, setShowReservs] = useState(false);
  const { Logout } = useContext(AuthContext);

  return (
    <div className="flex flex-col sidebar pb-4" style={{ height: "100%" }}>
      <div className="logo flex justify-center">
        <img width={200} src={"/logo.png"} alt="" />
      </div>

      <div className="list flex-col flex h-full">
        <Link href="/admin/dashboard" className="a">
          داشبورد
        </Link>

        <div onClick={() => setShowNews(!showNews)} className="a">
          <span>نوشتن</span>

          {showNews && (
            <span className="flex flex-col">
              <Link href="/admin/article/add" className="a">
                افزودن نوشته
              </Link>
              <Link href="/admin/article" className="a">
                مشاهده نوشته
              </Link>
            </span>
          )}
        </div>

        <div onClick={() => setShowCategory(!showCategory)} className="a">
          <span>دسته بندی ها</span>
          {showCategory && (
            <span className="flex-col flex">
              <Link href="/admin/category/add" className="a">
                افزودن
              </Link>
              <Link href="/admin/category" className="a">
                مشاهده
              </Link>
            </span>
          )}
        </div>
        <div onClick={() => setShowEdcServices(!showEdcServices)} className="a">
          <span>خدمات آموزشی</span>
          {showEdcServices && (
            <span className="flex-col flex">
              <Link href="/admin/edcService/add" className="a">
                افزودن
              </Link>
              <Link href="/admin/edcService" className="a">
                مشاهده
              </Link>
            </span>
          )}
        </div>
        <div onClick={() => setShowReservs(!showReservs)} className="a">
          <span>رزرو ها</span>
          {showReservs && (
            <span className="flex-col flex">
              <Link href="/admin/reserve" className="a">
                مشاهده
              </Link>
            </span>
          )}
        </div>
        <div onClick={() => setShowServices(!showServices)} className="a">
          <span>خدمات </span>
          {showServices && (
            <span className="flex-col flex">
              <Link href="/admin/service/add" className="a">
                افزودن
              </Link>
              <Link href="/admin/service" className="a">
                مشاهده
              </Link>
            </span>
          )}
        </div>

        <div onClick={() => setShowOwner(!showOwner)} className="a">
          <span>مشخصات مالک سالن</span>
          {showOwner && (
            <span className="flex-col flex">
              <Link href="/admin/ownerDetail/edit?id=3" className="a">
                نمایش
              </Link>
            </span>
          )}
        </div>
        <div onClick={() => setShowGallery(!showGallery)} className="a">
          <span>گالری</span>
          {showGallery && (
            <span className="flex-col flex">
              <Link href="/admin/gallery/add" className="a">
                افزودن
              </Link>
              <Link href="/admin/gallery" className="a">
                مشاهده
              </Link>
            </span>
          )}
        </div>
        <div onClick={() => setShowSalon(!showSalon)} className="a">
          <span>سالن</span>
          {showSalon && (
            <span className="flex-col flex">
              <Link href="/admin/salon/add" className="a">
                افزودن
              </Link>
              <Link href="/admin/salon" className="a">
                مشاهده
              </Link>
            </span>
          )}
        </div>
        <div onClick={() => setShowNumbers(!showNumbers)} className="a">
          <span>شماره تماس</span>
          {showNumbers && (
            <span className="flex-col flex">
              <Link href="/admin/number/add" className="a">
                افزودن
              </Link>
              <Link href="/admin/number" className="a">
                مشاهده
              </Link>
            </span>
          )}
        </div>

        <div onClick={() => setShowUsers(!showUsers)} className="a">
          <span>کاربران</span>
          {showUsers && (
            <span className="flex-col flex">
              <Link href="/admin/users/add" className="a">
                افزودن کاربر
              </Link>
              <Link href="/admin/users" className="a">
                نمایش کاربران
              </Link>
            </span>
          )}
        </div>
        <div onClick={() => setShowComments(!showComments)} className="a">
          <span>نظرات</span>
          {showComments && (
            <span className="flex-col flex">
              <Link href="/admin/comment/add" className="a">
                افزودن
              </Link>
              <Link href="/admin/comment" className="a">
                نمایش
              </Link>
            </span>
          )}
        </div>

        <div onClick={Logout} className="my-6 " style={{ color: "#dd3939" }}>
          خروج
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
