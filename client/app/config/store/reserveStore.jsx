import { create } from "zustand";

import { getCookie } from "cookies-next";

export const reserveStore = create((set) => ({
  step: 1,
  service: "",
  date: "",
  token: getCookie("refreshToken"),
  time: "",
  name: "",
  number: "",
  isSelected: false,

  setStep: (step) => set((state) => ({ step: step })),
  setService: (service) => set((state) => ({ service: service })),
  setDate: (date) => set((state) => ({ date: date })),
  setTime: (time) => set((state) => ({ time: time })),
  setName: (name) => set((state) => ({ name: name })),
  setNumber: (number) => set((state) => ({ number: number })),
  setIsSelected: (selected) => set((state) => ({ isSelected: selected })),
}));
