import { useEffect, useState } from "react";

export const useFilteredPokemons = (filterList, pokeData) => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const filter = () => {
      const newFilterList = pokeData.filter(
        (el) =>
          filterList.includes(el.types[0].type.name) ||
          (el.types[1] && filterList.includes(el.types[1].type.name))
      );
      setPokemons(newFilterList);
    };

    filter();
  }, [filterList, pokeData]);
  return [pokemons];
};
