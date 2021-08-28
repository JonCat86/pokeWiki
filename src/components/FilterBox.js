import React, { useState, useEffect } from "react";

const FilterBox = ({ handleClick }) => {
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

  return (
    <div className="filters">
      <div className="filters-btns">
        {types.length > 0 ? (
          types.map((type) => (
            <button
              key={type.name}
              className={`type-btn type-unselected ${type.name}`}
              name={type.name}
              onClick={handleClick}
            >
              {type.name.charAt(0) + type.name.slice(1)}
            </button>
          ))
        ) : (
          <h2>Loading</h2>
        )}
      </div>
      <button className="reset" name="reset" onClick={handleClick}>
        reset
      </button>
    </div>
  );
};

export default FilterBox;
