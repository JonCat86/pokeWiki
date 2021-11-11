import { useState, useEffect } from "react";
import { pokeFetch } from "../helpers/pokeFetch";

export const useFetch = (setIsLoaded) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      setData(await pokeFetch());
      setIsLoaded(true);
    };
    getData();
  }, []);
  return [data];
};
