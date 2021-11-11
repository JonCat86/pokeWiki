import Gallery from "./components/Gallery";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import Loader from "./components/Loader";
import { useFetch } from "./hooks/useFetch";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data] = useFetch(setIsLoaded);

  return (
    <div>
      <Header />
      {isLoaded ? <Gallery pokeData={data} /> : <Loader />}
      <Footer />
    </div>
  );
}

export default App;
