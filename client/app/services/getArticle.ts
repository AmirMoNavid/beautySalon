import axios from "axios";

export async function getArticle(id, token) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const data = await axios.get(`${baseUrl}/api/article/${id}`, {
      withCredentials: true,
    });

    const trackView = axios.get(`${baseUrl}/api/article/trackView/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err) {
    console.log(err);
  }
}
