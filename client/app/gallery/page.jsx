"use client";

import axios from "axios";
import { useEffect } from "react";
import { useStore } from "../config/store/use-hooks";
import { END_POINTS } from "../config/store/endPoints";
import "./style.css";
import Spinner from "../components/secondLoader/spinner";

function Gallery() {
  const { baseUrl, host, gallery, setGallery } = useStore();

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

    if (navbar && window.location.pathname !== "/") {
      navbar.style.background = "rgb(0 0 0 / 90%)";
      navbar.style.backdropFilter = "blur(2px)";
    }
  }, []);

  useEffect(() => {
    getGallery();
  }, []);

  return (
    <div className="min-h-screen w-full bg-black px-4 py-20 pt-[95px] sm:px-6 md:px-10 md:pt-[115px]">
      <h1 className="mb-6 w-full text-2xl text-white">گالری</h1>

      {gallery.length > 0 ? (
        <div className="gallery-masonry">
          {gallery.map((image, i) => (
            <div
              key={image.id ?? image.url ?? i}
              className="gallery-masonry-item group relative cursor-pointer overflow-hidden rounded-lg"
            >
              <img
                className="block h-auto w-full transition-transform duration-300 group-hover:scale-[1.02]"
                src={`${host}${image.url}`}
                alt={`gallery-${i + 1}`}
                loading="lazy"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default Gallery;
