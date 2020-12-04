import { useContext, useEffect, useState } from "react";
import { User } from "../contexts/index";
import { requestHeaders } from "../helpers/index";

export default function useRequestConfig() {
  const { user } = useContext(User);
  const [config, setConfig] = useState(null);
  useEffect(() => {
    if (user) {
      setConfig(requestHeaders(user.token));
    }
  }, [user]);
  return config;
}
