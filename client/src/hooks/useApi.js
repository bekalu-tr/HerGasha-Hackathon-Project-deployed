import { useCallback, useState } from "react";

export default function useApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const execute = useCallback(async (apiFunction, ...args) => {
    setLoading(true);
    setError("");

    try {
      const response = await apiFunction(...args);

      setData(response.data);
      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Something went wrong. Please try again.";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = () => setError("");

  return {
    data,
    loading,
    error,
    execute,
    clearError,
    setData,
  };
}
