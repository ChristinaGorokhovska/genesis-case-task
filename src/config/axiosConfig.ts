import axios from "axios";
import { useAuthContext } from "../context/authProvider";

const instance = axios.create({
  baseURL: `https://api.wisey.app/api/v1`,
});

declare module "axios" {
  export interface AxiosRequestConfig {
    title?: string;
    postType?: string;
  }
}

export default instance;
