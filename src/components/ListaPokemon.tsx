import { useEffect, useState } from "react";
import Cargando from "./Cargando/Cargando";
import Pokemon from "./Pokemon";
import Header from "./Header";
import Navbar from "./Navbar";

interface poke {
  name: string;
  url: string;
}

function ListaPokemon() {
  const [listaPoke, setListaPokes] = useState<poke[]>([]);
  const [pagina, setPagina] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [error, setError] = useState(false);
  const [carga, setCarga] = useState(false);

  useEffect(() => {
    async function consultarApi(url: string) {
      try {
        const objeto = await fetch(url);
        const completoJson = await objeto.json();

        return completoJson;
      } catch (error) {
        console.error(error);
      }
    }
    setCarga(true);
    if (pagina) {
      const result = consultarApi(pagina);
      result
        .then((data) => {
          setListaPokes(data.results);
        })
        .catch(() => setError(true))
        .finally(() => setCarga(false));
    }
  }, [pagina]);

  if (carga) {
    return <Cargando />;
  }
  if (error) {
    return <div>Ocurrió un error al cargar la lista de Pokémon {error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {listaPoke.map((poke, index) => (
          <Pokemon poke={poke} key={index} />
        ))}
      </div>
      <Navbar cambiarPantalla={setPagina} pantallaActual={pagina} />
    </div>
  );
}

export default ListaPokemon;
