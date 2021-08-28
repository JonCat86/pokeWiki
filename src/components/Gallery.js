import React, { useState, useEffect } from "react";
import FilterBox from "./FilterBox";

import PokeCard from "./PokeCard";

const Gallery = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState([]);
  const [data, setData] = useState([]);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(false);
      setData([]);
      // fetch for pokemon list
      const res1 = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=386");
      const json1 = await res1.json();
      // fetch for every pokemon
      let juarez = await Promise.all(
        json1.results.map(async (el) => {
          const res2 = await fetch(el.url);
          return await res2.json();
        })
      );
      setData(juarez);
    };

    fetchData();
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const filteredData = async () => {
      const a = await data.filter(
        (el) =>
          filter.includes(el.types[0].type.name) ||
          (el.types[1] && filter.includes(el.types[1].type.name))
      );
      setPokemons(a);
    };
    filteredData();
  }, [filter]);

  const handleClick = (e) => {
    let name = e.target.name;
    if (name === "reset") {
      setFilter([]);
      let typesBtns = document.querySelectorAll(".type-btn");
      typesBtns.forEach((el) => el.classList.add("type-unselected"));
    } else {
      e.target.classList.contains("type-unselected")
        ? e.target.classList.remove("type-unselected")
        : e.target.classList.add("type-unselected");
      if (filter.some((el) => name === el)) {
        const a = filter.filter((el) => el !== name);
        setFilter(a);
      } else setFilter((filter) => [...filter, name]);
    }
  };

  return (
    <div className="gallery">
      <FilterBox handleClick={handleClick} />
      <div className="cards-container">
        {isLoaded &&
          (pokemons.length > 0
            ? pokemons.map((el) => <PokeCard key={el.id} pokemon={el} />)
            : data.map((el) => <PokeCard key={el.id} pokemon={el} />))}
      </div>
    </div>
  );
};

export default Gallery;
