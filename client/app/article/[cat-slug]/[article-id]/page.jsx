"use client";
import { useParams } from "next/navigation";
import Detail from "../../../components/detailPage/news";
import LastNews from "../../../components/detailPage/lastNews";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../components/loader/loader";
import { getCookie } from "cookies-next";
import { useStore } from "@/app/config/store/use-hooks";
import ShowGallery from "@/app/components/showGallery";
import ShowSalon from "@/app/components/showSalon";

const Artice = () => {
  const { latestNews, comments, setCmments, setLatestNews, baseUrl } =
    useStore();

  const [width, setWidth] = useState(0);
  const [article, setArticle] = useState(null);

  const params = useParams();

  const token = getCookie("refreshToken");

  async function getArticle(id) {
    const data = await axios.get(`${baseUrl}/api/article/${id}`, {
      withCredentials: true,
    });

    const trackView = axios.get(`${baseUrl}/api/article/trackView/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // const parsed = JSON.parse(data);
    setArticle(data.data);
  }

  async function getLatestNews() {
    const data = await axios.get(`${baseUrl}/api/article/latest`, {
      withCredentials: true,
    });

    setLatestNews(data.data);
  }

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWidth]);

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
    const articleId = params?.["article-id"];
    getArticle(articleId);
    getLatestNews();
  }, []);

  if (!article)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  return (
    <div className=" relative w-[95%] flex flex-col md:flex-row justify-center gap-3 mt-[92px]">
      {width > 768 ? <LastNews /> : ""}
      {article ? <Detail article={article} /> : ""}
      {width < 768 ? <LastNews /> : ""}
      <div className="flex flex-col flex-1">
        <ShowGallery />
        <ShowSalon />
      </div>
    </div>
  );
};

export default Artice;
