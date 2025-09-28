import { create } from "zustand";

import { getCookie } from "cookies-next";

export const useStore = create((set) => ({
  categories: [],
  articles: [],
  latestNews: [],
  token: getCookie("refreshToken"),
  comments: [],
  shareBoxStatus: {
    path: "/",
    text: "",
    isDisplayed: false,
  },
  host:
    process.env.NODE_ENV === "production"
      ? "https://abyekiha.ir"
      : "http://localhost:3000",
  baseUrl:
    process.env.NODE_ENV === "production"
      ? "https://api.abyekiha.ir"
      : "http://localhost:5000",
  isLoading: false,
  salon: [],
  gallery: [],

  setCategories: (cats) => set((state) => ({ categories: cats })),
  setShareBoxStatus: (status) => set((state) => ({ shareBoxStatus: status })),
  setIsLoading: (isLoading) => set((state) => ({ isLoading: isLoading })),
  setArticles: (articles) => set((state) => ({ articles: articles })),
  setLatestNews: (latest) => set((state) => ({ latestNews: latest })),
  setComments: (comments) => set((state) => ({ comments: comments })),
  setSalon: (images) => set((state) => ({ salon: images })),
  setGallery: (images) => set((state) => ({ gallery: images })),
}));
