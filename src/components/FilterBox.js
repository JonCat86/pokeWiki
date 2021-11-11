import { useFilter } from "../hooks/useFilter";

const FilterBox = ({ handleClick }) => {
  const [types] = useFilter();

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
