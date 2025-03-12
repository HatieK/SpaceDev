import { useEffect, useState } from "react";

export const useFetch = (promise, dependencies = []) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    fetchData();
  }, dependencies);

  const fetchData = async () => {
    console.log('🚀"fetch"---->', "fetch");
    try {
      setLoading(true);
      setStatus("pending");
      const res = await promise();

      setData(res);
      setStatus("success");
    } catch (error) {
      setError(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    status,
  };
};
