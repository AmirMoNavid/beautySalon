"use client";
import { reserveStore } from "@/app/config/store/reserveStore";
import React from "react";
import { useEffect } from "react";

function Info() {
  const { name, setName, number, setNumber, setIsSelected } = reserveStore();
  function handleNumberChange(e) {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = onlyNums;

    setNumber(onlyNums);
  }

  useEffect(() => {
    if (name.length > 2 && number.length == 11) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [name, number]);

  return (
    <div className="w-full h-full flex-col pr-2  flex items-start justify-center shadow">
      <h2 className="text-xl border-b border-b-gray-200 pb-2 w-full font-semibold mb-6 text-right">
        تکمیل اطلاعات
      </h2>
      <div className="bg-white h-full p-8 rounded-lg  w-full max-w-md">
        <form className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm text-right mb-1">تلفن :</label>
            <input
              value={number}
              onChange={(e) => handleNumberChange(e)}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={11}
              placeholder="مثلاً 09123456789"
              className="border border-gray-300 rounded px-4 py-2 text-right"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-right mb-1">
              نام و نام خانوادگی :
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder=""
              className="border border-gray-300 rounded px-4 py-2 text-right"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Info;
