import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const Http = async (method: string, endpoint: string, data: Object): Promise<AxiosResponse> => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + endpoint;

    const headers = {
      "Autherization": localStorage.getItem("token") || null
    }
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      headers
    }

    // props filtering
    method.toLowerCase() === "get" && delete config.data;

    const result = await axios(config);

    return result;
  } catch (error) {
    toast.error(error.message, { toastId: 3 });
    console.log(error);
  }
}

export default Http;