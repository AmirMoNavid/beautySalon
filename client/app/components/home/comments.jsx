"use client";
import { useStore } from "@/app/config/store/use-hooks";
import { getComments } from "@/app/services/getComments";
import React, { useEffect, useState } from "react";

function Comments() {
  const [comments, setComments] = useState([]);
  const { host } = useStore();

  useEffect(() => {
    getComments().then((data) => setComments(data));
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
            className="w-full md:px-4 p-2   flex bg-[#313030] text-white rounded-sm my-4 items-center justify-start gap-3 comment-item"
          >
            <div className="flex items-end justify-start">
              <img
                src={`${host}${c.url}`}
                className="w-[120px] md:w-[80px] object-cover"
                style={{ clipPath: "circle()" }}
              />
            </div>
            <p className="pt-1 pr-1 flex items-center text-xs md:text-normal">
              {c.shortDesc}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Comments;
