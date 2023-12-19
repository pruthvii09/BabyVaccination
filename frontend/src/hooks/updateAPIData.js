import { useState } from "react";
import axios from "axios";

const useUpdateAPIData = () => {
  const [getloading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = async (url, headers, dataToUpdate) => {
    setLoading(true);
    try {
      const res = await axios.patch(url, dataToUpdate, headers);
      return res.data;
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { getloading, error, updateData };
};
export default useUpdateAPIData;
