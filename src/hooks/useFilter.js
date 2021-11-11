import { useEffect, useState } from "react";

export const useFilter = () => {
  const [types, setTypes] = useState([]);
  useEffect(() => {
    const fetchTypes = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/type");
      const json = await res.json();
      const filteredTypes = json.results.filter(
        (el) => el.name !== "unknown" && el.name !== "shadow"
      );
      setTypes(filteredTypes);
    };
    fetchTypes();
  }, []);

  return [types];
};
