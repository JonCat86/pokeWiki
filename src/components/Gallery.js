import React, { useState, useEffect } from "react";
import FilterBox from "./FilterBox";
import Modal from "./Modal";

import PokeCard from "./PokeCard";

const Gallery = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState([]);
  const [data, setData] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [modalPokemon, setModalPokemon] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(false);
      setData([]);
      // fetch for pokemon list
      const res1 = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=251");
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
    const filteredData = () => {
      const a = data.filter(
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

  const openModal = async (pokemon) => {
    let modalPokeInfo = {};
    modalPokeInfo.id = pokemon.id;
    modalPokeInfo.name = pokemon.name;
    modalPokeInfo.height = pokemon.height;
    modalPokeInfo.weight = pokemon.weight;
    modalPokeInfo.sprites = pokemon.sprites;
    modalPokeInfo.types = pokemon.types;
    modalPokeInfo.stats = pokemon.stats;
    const res = await fetch(pokemon.species.url);
    const json = await res.json();
    const description = json.flavor_text_entries[0].flavor_text.replace(
      "",
      " "
    );
    modalPokeInfo.flavor_text = description;
    modalPokeInfo.category = json.genera[7].genus;
    modalPokeInfo.habitat = json.habitat.name;
    console.log("pokemon", pokemon);
    console.log(modalPokeInfo);
    setModalPokemon(modalPokeInfo);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalPokemon(null);
  };

  return (
    <div className="gallery">
      <FilterBox handleClick={handleClick} />
      <div className="cards-container">
        {isLoaded && pokemons.length > 0
          ? pokemons.map((el) => (
              <PokeCard key={el.id} pokemon={el} openModal={openModal} />
            ))
          : data.map((el) => (
              <PokeCard key={el.id} pokemon={el} openModal={openModal} />
            ))}
      </div>
      {modalIsOpen && (
        <Modal modalPokemon={modalPokemon} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Gallery;
