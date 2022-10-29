import { useCallback, useState } from "react";

const useHttp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const sendRequest = useCallback(async (requestConfig, dataHandler) => {
    setIsloading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      dataHandler(data);
    } catch (error) {
      console.log(error);
      setError(error.message || "Something went wrong!");
    }
    setIsloading(false);
  }, []);

  return {
    error,
    isLoading,
    sendRequest,
    setError,
  };
};

export default useHttp;
