import { END_POINTS } from "@/app/config/store/endPoints";
import { reserveStore } from "@/app/config/store/reserveStore";
import { useStore } from "@/app/config/store/use-hooks";
import axios from "axios";
import React, { useEffect, useState } from "react";

function PickServices() {
  const { setService, setServiceId, setStep, setDate, setTime, setIsSelected } =
    reserveStore();
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

  function handleSelect(service) {
    setService(service.title);
    setServiceId(service.id);
    setDate("");
    setTime("");
    setIsSelected(false);

    setStep(2);
  }

  return (
    <div className="w-3/4 p-6 bg-white">
      <h1 className="text-xl font-bold mb-6 text-center">انتخاب سرویس</h1>
      <div className="space-y-4">
        {services?.map((service) => (
          <div
            onClick={() => handleSelect(service)}
            key={service.id}
            className="w-full flex group cursor-pointer hover:bg-black hover:text-white transition items-center justify-between service p-4 rounded shadow"
          >
            <span>{service.title}</span>
            <span className="text-sm opacity-70">
              {service.durationMinutes} دقیقه
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PickServices;
