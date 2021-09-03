import pokeball from "../assets/pokeball-loading.png";

const Loader = () => {
  return (
    <div className="loader">
      <img src={pokeball} alt="pokeball loader" />
      <h1>Loading...</h1>
    </div>
  );
};

export default Loader;
