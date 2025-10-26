import axios from "axios";

export async function getMostViewed() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const { data } = await axios.get(
      `${baseUrl}/api/article?orderBy=numViews&limit=4`
    );

    return data;
  } catch (err) {
    console.log(err);
  }
}
