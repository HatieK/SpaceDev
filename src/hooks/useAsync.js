import { useEffect, useState } from "react";

export const useAsync = (promise) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState("idle");

  const execute = async (...data) => {
    try {
      setLoading(true);
      setStatus("pending");
      const res = await promise(...data);

      setData(res);
      setStatus("success");
      return res;
    } catch (error) {
      setError(error);
      setStatus("error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    status,
    execute,
  };
};
