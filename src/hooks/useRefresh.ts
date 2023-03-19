import React, { useState } from "react";
import { useAuthContext } from "../context/authProvider";
import Axios from "../config/axiosConfig";

export default function useRefresh() {
  const [platform, setPlatform] = useState<string>("subscriptions");
  const { setAuth } = useAuthContext();

  const refresh = async () => {
    try {
      const res = await Axios.get(`/auth/anonymous`, {
        params: {
          platform: platform,
        },
      });
      const token = res.data.token;

      setAuth({ accessToken: token });

      return res.data.token;
    } catch (error) {}
  };

  return refresh;
}
