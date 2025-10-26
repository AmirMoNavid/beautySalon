"use client";
import { useParams } from "next/navigation";
import Detail from "../../../components/detailPage/news";
import LastNews from "../../../components/detailPage/lastNews";
import { useEffect, useState } from "react";
import Loader from "../../../components/loader/loader";
import { getCookie } from "cookies-next";
import { useStore } from "@/app/config/store/use-hooks";
import ShowGallery from "@/app/components/showGallery";
import ShowSalon from "@/app/components/showSalon";
import { getLatestArticles } from "@/app/services/gatLatestArticles";
import { getArticle } from "@/app/services/getArticle";

const Artice = () => {
  const { setLatestNews } = useStore();
  const [width, setWidth] = useState(0);
  const [article, setArticle] = useState(null);

  const params = useParams();

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
    const token = getCookie("refreshToken");
    getArticle(articleId, token).then((data) => setArticle(data.data));
    getLatestArticles().then((data) => setLatestNews(data.data));
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
