import axios from "axios";
import { getCookie } from "cookies-next";

const getServerData = async (endPoint) => {
  const beseUrl = "https://api.aramisbeauty.ir";

  const url = beseUrl + endPoint;
  const token = getCookie("refreshToken");
  try {
    const res_ = axios({
      url,
      method: "get",
      timeout: 20000,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return (await res_)?.data;
  } catch (err) {
    const { data } = err?.response?.data ?? {};
    console.log(
      err.errors ?? {
        title: "AxiosError",
        code: err?.code,
        message: err?.message,
        url,
        data: typeof data === "string" ? data?.slice(0, 100) : data,
      }
    );
    return [];
  }
};

export default getServerData;
