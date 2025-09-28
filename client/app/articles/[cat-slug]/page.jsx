"use client";

import axios from "axios";
import Article from "../../components/article";
import { useStore } from "@/app/config/store/use-hooks";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MostViewed from "@/app/components/home/mostViewed";
import Wrapper from "../../components/wrapper";
import ShareModal from "../../components/shareBox/shareModal";
import ShowGallery from "@/app/components/showGallery";
import ShowSalon from "@/app/components/showSalon";

const filteredArticles = () => {
  const { articles, setArticles, isLoading, setIsLoading, baseUrl, host } =
    useStore();

  const [category, setCategory] = useState();
  const params = useParams();

  async function getCategory(slug) {
    const data = await axios.get(`${baseUrl}/api/category/slug/${slug}`);

    setCategory(data.data);
  }

  async function getArticles() {
    const data = await axios.get(`${baseUrl}/api/article`);

    setArticles(data.data);
  }

  useEffect(() => {
    const navbar = document.getElementById("header");
    const path = window.location.pathname;
    if (path !== "/") {
      navbar.style.background = "rgb(0 0 0 / 90%)";
      navbar.style.backdropFilter = "blur(2px)";
      return;
    }
  }, []);

  const catSlug = params?.["cat-slug"];

  useEffect(() => {
    getCategory(catSlug);
    getArticles();
    setIsLoading(false);
  }, []);

  const filteredArticles = articles.filter((a, i) => {
    if (a.catId == category?.id && !undefined) return a;
    else return;
  });

  return (
    <>
      <div className=" w-[95%] md:flex-row flex flex-col justify-between gap-4 mt-[92px]">
        <div className="w-full md:w-[72%] p-2 flex flex-col gap-4">
          <Wrapper text={`${category ? category?.name : "درحال بارگذاری"}`} />
          {filteredArticles?.length > 0 ? (
            filteredArticles?.map((a, i) =>
              a !== undefined ? (
                <Article slug={catSlug} key={a.id} article={a} />
              ) : (
                ""
              )
            )
          ) : (
            <h2 className="italic text-center ">
              خبری مرتبط با این دسته بندی منتشر نشده است.
            </h2>
          )}
        </div>
        <div className="flex flex-col flex-1">
          <ShowGallery />
          <ShowSalon />
        </div>
      </div>

      <ShareModal />
      <MostViewed />
    </>
  );
};

export default filteredArticles;
