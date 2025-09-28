"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useStore } from "../config/store/use-hooks";
import { END_POINTS } from "../config/store/endPoints";
import "./style.css";
import Spinner from "../components/secondLoader/spinner";

function Gallery() {
  const { baseUrl, host, gallery, setGallery } = useStore();
  const [images, setImages] = useState([]);

  async function getGallery() {
    try {
      const { data } = await axios.get(`${baseUrl}${END_POINTS.GALLERY}`);

      setGallery(data);

      window.scrollTo(0, 0);
    } catch (err) {
      console.log(err);
    }
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

  useEffect(() => {
    getGallery();
  }, []);

  return (
    <div className="bg-[#1c1c1c] flex flex-wrap justify-start items-start gap-4  px-10 md:pr-24 py-20 pt-[95px] md:pt-[115px] min-h-screen w-full h-full">
      <h1 className="text-2xl text-white  w-full">گالری</h1>
      {gallery.length > 0 ? (
        gallery?.map((image, i) => (
          <div
            key={i}
            className="relative group w-full sm:w-[48%] md:w-[30%] h-[300px] overflow-hidden rounded-lg cursor-pointer"
          >
            <img
              className="w-full h-full object-cover object-center"
              src={`${host}${image.url}`}
              alt={`gallery-${i}`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1d1ca6] via-transparent to-black opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center"></div>
          </div>
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default Gallery;
