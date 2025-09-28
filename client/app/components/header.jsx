"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useStore } from "../config/store/use-hooks";
import { MdOutlineArticle } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import path from "path";
import NavBar from "./navBar";

function Header() {
  const { baseUrl, isLoading, setIsLoading, categories, setCategories } =
    useStore();
  const [showNav, setShowNav] = useState(false);
  const path = usePathname();
  const isAdminPage = path.startsWith("/admin");

  const router = useRouter();

  if (isAdminPage) return;

  async function getCategories() {
    try {
      const { data } = await axios.get(`${baseUrl}/api/category`);

      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  }

  function handleCategory(slug) {
    if (path == `/articles/${slug}`) return;
    setShowNav(false);
    setIsLoading(true);
    router.push(`/articles/${slug}`);
  }

  function handleScroll() {
    const path = window.location.pathname;
    const navbar = document.getElementById("header");
    if (path !== "/") return;
    if (window.scrollY === 0) {
      navbar.style.background = "rgb(0 0 0 / 0%)";
      navbar.style.backdropFilter = "blur(1px)";
    } else {
      navbar.style.background = "rgb(0 0 0 / 70%)";
      navbar.style.backdropFilter = "blur(2px)";
    }
  }

  useEffect(() => {
    const path = window.location.pathname;
    console.log(path);
    if (path !== "/") {
      return;
    }
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showNav) {
      document.querySelector(".nav-bar").style.transform = "translateX(-100%)";
    } else {
      document.querySelector(".nav-bar").style.transform = "translateX(100%)";
    }
  }, [showNav]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div
        id="header"
        className="header transition  flex justify-between w-full text-white  p-4 fixed top-0 z-10 "
      >
        <div className="w-[60px]">
          <img src="/logo.png" />
        </div>
        <nav className=" items-center hidden md:flex">
          <ul className="flex items-center gap-6 w-full">
            <li onClick={() => router.push("/")} className="hover:opacity-50">
              صفحه اصلی
            </li>
            <div className="relative group">
              <span className="flex hover:opacity-75">
                مقالات{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 transition pt-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
              <div className=" group-hover:flex bg-[#000000c2]  hidden transition flex-col z-20 text-[12px] text-white absolute top-[105%]  rounded-md overflow-hidden">
                {categories?.map((cat, i) => (
                  <div
                    onClick={() => handleCategory(cat.slug)}
                    className=" cursor-pointer p-3 mb-[2px] px-2  w-[120px] bg-[#000000c2] text-white transition hover:text-black hover:bg-[#ffffffb0] flex justify-between"
                    key={i}
                  >
                    {cat.name}
                    <MdOutlineArticle size="20px" />
                  </div>
                ))}
              </div>
            </div>
            <li
              className="hover:opacity-50"
              onClick={() => router.push("/gallery")}
            >
              گالری
            </li>
            <li
              className="hover:opacity-50"
              onClick={() => router.push("/salon")}
            >
              سالن
            </li>
            <li
              className="hover:opacity-50"
              onClick={() => router.push("/reserve")}
            >
              رزرو
            </li>
            <li
              className="hover:opacity-50"
              onClick={() => {
                document
                  .querySelector(".footer")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              تماس با ما
            </li>
          </ul>
        </nav>
        <div className=" items-center gap-6  hidden md:flex">
          <a className="flex items-center justify-center gap-1 hover:opacity-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#fff"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <span>20:30 - 8:00</span>
          </a>
          <a
            href="tel:09127816137"
            className="flex items-center justify-center gap-1 border-l pl-2 hover:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#fff"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clipRule="evenodd"
              />
            </svg>

            <span>09127816137</span>
          </a>
        </div>
        <div className="items flex w-full py-2 px-5 justify-end md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="#fff"
            onClick={() => setShowNav(!showNav)}
            className="size-8 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>
      <NavBar
        setIsLoading={setIsLoading}
        categories={categories}
        showNav={showNav}
        setShowNav={setShowNav}
      />
    </>
  );
}

export default Header;
