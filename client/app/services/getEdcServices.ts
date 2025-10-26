import axios from "axios";
import { END_POINTS } from "../config/store/endPoints";

export async function getEdcServices() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const { data } = await axios.get(`${baseUrl}${END_POINTS.GET_EDCSERVICES}`);

    return data;
  } catch (err) {
    console.log(err);
  }
}
