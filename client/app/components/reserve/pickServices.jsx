import { END_POINTS } from "@/app/config/store/endPoints";
import { reserveStore } from "@/app/config/store/reserveStore";
import { useStore } from "@/app/config/store/use-hooks";
import axios from "axios";
import React, { useEffect, useState } from "react";

function PickServices() {
  const { setService, setStep, isSelected, setIsSelected } = reserveStore();
  const { baseUrl } = useStore();
  const [services, setServices] = useState();

  async function getServices() {
    try {
      const { data } = await axios.get(baseUrl + END_POINTS.GET_SERVICES);
      console.log(data);
      setServices(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getServices();
  }, []);

  function handleSelect(title, e) {
    e.target.style.background = "#000";
    e.target.style.color = "#fff";
    setService(title);
    setIsSelected(false);
    setStep(2);
  }

  return (
    <div className="w-3/4 p-6 bg-white">
      <h1 className="text-xl font-bold mb-6 text-center">انتخاب سرویس</h1>
      <div className="space-y-4">
        {services?.map((service, index) => (
          <div
            onClick={(e) => handleSelect(service.title, e)}
            key={index}
            className="w-full flex group cursor-pointer hover:bg-black hover:text-white transition items-center justify-between service p-4 rounded shadow"
          >
            {service.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PickServices;
