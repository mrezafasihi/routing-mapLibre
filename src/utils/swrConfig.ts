import { SWRConfiguration } from "swr";
import { apiKey } from "../constants";
import { IDisplayUploadItem } from "./types";

// [ ]: type it. both the args and the return value
// maybe you can use generic types to type your returned data 
// and maybe you shouldn't pass it to the swr global config 
// EXPECTED RESULT: useSWR(fetcher<MyCustomType>)

// interface IReturnDataGlobalConfigSWR{

// }

export const fetcher = async (url:string):Promise<IDisplayUploadItem[]> => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  // [ ]: option two: response.json() as MyCustomType
  return response.json();
};


const swrConfig: SWRConfiguration = {
  fetcher,
  onError: (error) => {
    console.log(error);
  },
};
export default swrConfig;
