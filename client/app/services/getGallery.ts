import axios from "axios";
import { END_POINTS } from "../config/store/endPoints";

export async function getGallery() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const { data } = await axios.get(`${baseUrl}${END_POINTS.GALLERY}`);

    window.scrollTo(0, 0);

    return data;
  } catch (err) {
    console.log(err);
  }
}
