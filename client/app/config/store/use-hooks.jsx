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
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_LOCAL_HOST
      : process.env.NEXT_PUBLIC_PUBLIC_HOST,

  baseUrl:
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_LOCAL_API_URL
      : process.env.NEXT_PUBLIC_API_URL,

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
