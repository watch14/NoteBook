// api urls
import axios from "axios";

export const Api = "http://localhost:5000/api/";

export default async function GeNotebookPages(id) {
  const res = await axios.get(Api + `pages/notebook/${id}`);

  if (res.data.error) {
    throw new Error(res.data.error);
  }
  if (res.data.success) {
    return res.data.data;
  }
}
