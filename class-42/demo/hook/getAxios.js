import { useEffect, useState } from "react";
import axios from "axios";

// this hook looks just like a regular component but it returns values instead of jsx to render to the dom
const useGetAxios = (apiUrl) => {
  const [response, setResponse] = useState({});
  const [error, setError] = useState({});

  // set up a getPage - next or prev
  const getPage = async (url) => {
    try {
      let res = await axios.get(url);
      // res: {
      //   count, next, previous, results;
      // }
      setResponse(res.data);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    const initialGetRequest = async () => {
      try {
        let res = await axios.get(apiUrl);
        // res: {
        //   count, next, previous, results;
        // }
        setResponse(res.data);
      } catch (e) {
        setError(e);
      }
    };
    initialGetRequest();
  }, []);

  return { ...response, error, getPage };
};

export default useGetAxios;
