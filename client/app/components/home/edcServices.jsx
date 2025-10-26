"use client";
import { useStore } from "@/app/config/store/use-hooks";
import { getEdcServices } from "@/app/services/getEdcServices";
import { useEffect, useState } from "react";

function EdcServices() {
  const [services, setServices] = useState([]);
  const { host } = useStore();

  useEffect(() => {
    getEdcServices().then((data) => setServices(data));
  }, []);

  return (
    <div className="w-[90%] mx-auto flex flex-col justify-center">
      <h2 className="text-xl md:text-2xl font-bold text-center my-4">
        خدمات آموزشی
      </h2>
      <div className="edc-services flex flex-col flex-wrap md:flex-row justify-center gap-6 items-center my-6 ">
        {services?.map((s, i) => (
          <div
            key={i}
            className="relative edc-service-box group hover:scale-105 transition h-[200px] md:h-[300px]  w-3/4 md:w-[25%] overflow-hidden rounded-md my-4 md:my-0 cursor-pointer"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            <img
              src={`${host}${s.url}`}
              className="w-full  h-[100%] object-cover "
            />
            <div
              className="h-[20%] absolute z-10 bottom-0 w-full bg-[#00000088] text-white text-sm p-2 flex items-center justify-center text-center"
              style={{ backdropFilter: "blur(14px)" }}
            >
              {s.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EdcServices;
