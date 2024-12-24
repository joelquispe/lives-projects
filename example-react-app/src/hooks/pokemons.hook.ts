import { useEffect, useState } from "react";

const usePokemons = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message.toString());
          return;
        }
        setError("Ocurrio un problema al mostrar los pokemons");
      }
      setLoading(false);
    };
    fetchPokemons();
  }, []);

  return { data, loading, error };
};

export default usePokemons;
