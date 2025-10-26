import axios from "axios";
import { END_POINTS } from "../config/store/endPoints";

export async function getDatails() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await axios.get(
      `${baseUrl}${END_POINTS.GET_OWNERDETAILS}`
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
}
