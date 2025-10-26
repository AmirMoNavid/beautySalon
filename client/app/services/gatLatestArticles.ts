import axios from "axios";

export async function getLatestArticles() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const data = await axios.get(`${baseUrl}/api/article/latest`, {
      withCredentials: true,
    });

    return data;
  } catch (err) {
    console.log(err);
  }
}
