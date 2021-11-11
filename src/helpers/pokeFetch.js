export async function pokeFetch() {
  const rawData = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=251");
  const jsonData = await rawData.json();
  const loadData = await Promise.all(
    jsonData.results.map(async (el) => await (await fetch(el.url)).json())
  );
  return loadData;
}
