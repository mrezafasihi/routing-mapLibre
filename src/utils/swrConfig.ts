import { SWRConfiguration } from "swr";
import { apiKey } from "../constants";

const fetcher = async (url) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

const swrConfig: SWRConfiguration = {
  fetcher,
  onError: (error) => {
    console.log(error);
  },
};
export default swrConfig;
