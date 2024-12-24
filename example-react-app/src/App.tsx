import { useEffect, useState } from "react";
import "./App.css";
import CustomButtonComp from "./components/button.comp";
import usePokemons from "./hooks/pokemons.hook";
import { createBrowserRouter } from "react-router";
import ChristmasTreeWithSanta from "./components/Tree";




function App() {
  const { data, loading, error } = usePokemons();
  const [counter, setCounter] = useState(0);

  if (loading) {
    return (
      <div>
        <h1 className="font-bold text-4xl">Cargando...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="font-bold text-4xl">{error}</h1>
      </div>
    );
  }

  const increment = () => {
    setCounter(counter + 1);
  };

  const decrement = () => {
    setCounter(counter - 1);
  };

  // const fetchPokemons = async () => {
  //   try {
  //     const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  //     const data = await response.json();
  //     console.log(data);

  //   } catch (error) {
  //     console.error("Ocurrio un problema al mostrar los pokemos");
  //   }
  // };

  // useEffect(() => {
  //   fetchPokemons();
  // }, []);

  return (
    <div className="app">
      {" "}
      <ChristmasTreeWithSanta />
    </div>
  );
}

export default App;
