"use client";
import { END_POINTS } from "@/app/config/store/endPoints";
import { useStore } from "@/app/config/store/use-hooks";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Comments() {
  const [comments, setComments] = useState([]);
  const { baseUrl, host } = useStore();

  async function getComments() {
    try {
      const { data } = await axios.get(`${baseUrl}${END_POINTS.COMMENTS}`);

      setComments(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getComments();
  }, []);
  return (
    <>
      <h2 className="text-2xl text-center my-4">
        نظرات مراجعه کنندگان به سالن زیبایی آرمیس
      </h2>
      <div className="w-full flex flex-col justify-center items-center p-6">
        {comments?.map((c, i) => (
          <div
            key={i}
            className="w-full p-4 flex my-4  items-center justify-start gap-3 comment-item"
          >
            <div className="flex items-end justify-start">
              <img
                src={`${host}${c.url}`}
                className="w-[120px] md:w-[80px] object-cover"
                style={{ clipPath: "circle()" }}
              />
            </div>
            <p className="pt-1 pr-1 flex items-center text-sm md:text-normal">
              {c.shortDesc}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Comments;
