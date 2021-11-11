import React, { useState } from "react";
import { getSinglePokeInfo } from "../helpers/getSinglePokeInfo";
import { useFilteredPokemons } from "../hooks/useFilteredPokemons";
import FilterBox from "./FilterBox";
import Modal from "./Modal";
import PokeCard from "./PokeCard";

const Gallery = ({ pokeData }) => {
  const [filterList, setFilterList] = useState([]);
  const [pokemons] = useFilteredPokemons(filterList, pokeData);
  const [modalPokemon, setModalPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e) => {
    let name = e.target.name;
    if (name === "reset") {
      setFilterList([]);
      let typesBtns = document.querySelectorAll(".type-btn");
      typesBtns.forEach((el) => el.classList.add("type-unselected"));
    } else {
      e.target.classList.contains("type-unselected")
        ? e.target.classList.remove("type-unselected")
        : e.target.classList.add("type-unselected");
      if (filterList.some((el) => name === el)) {
        const a = filterList.filter((el) => el !== name);
        setFilterList(a);
      } else setFilterList((filter) => [...filter, name]);
    }
  };

  const openModal = async (pokemon) => {
    setModalPokemon(await getSinglePokeInfo(pokemon));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalPokemon(null);
  };

  return (
    <div className="gallery">
      <FilterBox handleClick={handleClick} />
      <div className="cards-container">
        {isModalOpen ? (
          <Modal modalPokemon={modalPokemon} closeModal={closeModal} />
        ) : pokemons.length > 0 ? (
          pokemons.map((el) => (
            <PokeCard key={el.id} pokemon={el} openModal={openModal} />
          ))
        ) : (
          pokeData.map((el) => (
            <PokeCard key={el.id} pokemon={el} openModal={openModal} />
          ))
        )}
      </div>
    </div>
  );
};

export default Gallery;
