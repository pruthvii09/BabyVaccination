import { useState, useEffect } from "react";
import axios from "axios";
const useGetAPIData = (url, headers) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [getError, setError] = useState(null);

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const res = await axios.get(url, headers);
        setData(res.data);
      } catch (error) {
        setError(error.response.data.error);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);
  return { data, loading, getError };
};
export default useGetAPIData;
