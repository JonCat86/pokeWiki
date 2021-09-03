const PokeCard = ({ pokemon, openModal }) => {
  const handleClick = () => {
    openModal(pokemon);
  };

  return (
    <div className="pokecard" onClick={handleClick}>
      <div className="img-box">
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
        />
      </div>
      <div className="info-box">
        <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      </div>
      <div className="types-box">
        {pokemon.types.map((type, index) => (
          <span className={`type ${type.type.name}`} key={index}>
            {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokeCard;
