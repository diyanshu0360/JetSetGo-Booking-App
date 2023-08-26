import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await axios.get(url).then((val) => {
          setData(val.data);
          // console.log(data)
        }).catch((e) => {
          console.log(e)
        });

      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const reFetch = async () => {
    setLoading(true);
    try {
      await axios.get(url).then((val) => {
        setData(val.data);
        // console.log(data)
      }).catch((e) => {
        console.log(e)
      });
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
