import { reserveStore } from "@/app/config/store/reserveStore";
import React from "react";

function Confirm() {
  const { service, name, number, date, time } = reserveStore();
  return (
    <div className="w-full md:p-6 bg-white">
      <h2 className="text-xl border-b border-b-gray-200 pb-2 w-full font-semibold mb-6 text-right">
        تایید رزرو
      </h2>
      <div className="card flex flex-col p-3 pr-4 border border-gray-400 shadow rounded-md hover:bg-black hover:text-white transition duration-500 ">
        <h2 className="font-bold text-[17px]">{service}</h2>
        <div className="flex items-center gap-2 text-sm mb-1">
          <span>تاریخ و ساعت :</span>
          <span className="font-semibold">{`${date}  ${time}`}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span>به نام :</span>
          <span className="font-semibold">{`${name}`}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span>با شماره :</span>
          <span className="font-semibold">{`${number}`}</span>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
