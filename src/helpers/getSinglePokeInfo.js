export const getSinglePokeInfo = async (pokemon) => {
  const fetchSingleInfo = async () => {
    let singlePokeInfo = {
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      sprites: pokemon.sprites,
      types: pokemon.types,
      stats: pokemon.stats,
    };
    const res = await fetch(pokemon.species.url);
    const json = await res.json();
    const description = json.flavor_text_entries[0].flavor_text.replace(
      "",
      " "
    );
    singlePokeInfo.flavor_text = description;
    singlePokeInfo.category = json.genera[7].genus;
    singlePokeInfo.habitat = json.habitat.name;
    return singlePokeInfo;
  };
  return fetchSingleInfo();
};
