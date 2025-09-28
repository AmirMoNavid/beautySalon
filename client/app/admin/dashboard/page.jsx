"use client";
import { useContext, useEffect, useState } from "react";
import Dashboard from "../../components/admin/Dashboard";
import "./dashboard.css";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { decode } from "jsonwebtoken";
import { useStore } from "@/app/config/store/use-hooks";
import axios from "axios";
const Main = () => {
  const [profileName, setProfileName] = useState("");
  const { baseUrl } = useStore();
  const token = getCookie("refreshToken");

  async function getUser() {
    try {
      const userId = decode(token)?.["userId"];
      const res = await axios.get(`${baseUrl}/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileName(res.data.name);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {}, []);

  useEffect(() => {
    if (!token) return window.location.replace(`/admin/auth`);
    else {
      getUser();
    }
  }, []);

  return (
    <Dashboard title={"داشبورد"}>
      <h1>سلام {profileName} , به پنل مدیریت خوش اومدی</h1>
      <h3>امیدوارم خبرای خوبی داشته باشی.</h3>
    </Dashboard>
  );
};

export default Main;
