import { useEffect, useState } from "react";
import BtnTipos from "./BtnTipos";
import Cargando from "./Cargando/Cargando";

interface info {
  indice: number;
  nombre: string;
  img: string;
  peso: string;
  alto: string;
  listaTipo: Array<string>;
}

interface poke {
  name: string;
  url: string;
}

function Pokemon({ poke }: { poke: poke }) {
  const [info, setInfo] = useState<info>();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);

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

    const result = consultarApi(poke.url);
    setCargando(true);

    result
      .then((data) => {
        setInfo({
          nombre: poke.name,
          indice: data.id,
          img: data["sprites"]["other"]["official-artwork"]["front_default"],
          peso: data.weight,
          alto: data.height,
          listaTipo: [
            ...data.types.map(
              (element: { slot: number; type: { name: string } }) =>
                element.type.name
            ),
          ],
        });
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      })
      .finally(() => setCargando(false));
  }, [poke]);

  if (error) {
    return <div>ocurre un error</div>;
  }
  if (cargando || info === undefined) {
    return (
      <div>
        Cargando...
        <Cargando />
      </div>
    );
  }

  return (
    <main className="bg-slate-100 p-4 max-w-xs mx-auto rounded-lg shadow-lg hover:shadow-xl transform transition-transform hover:-translate-y-2 duration-300">
      <section className="flex flex-col items-center">
        <img
          src={info.img}
          alt={info.nombre}
          className="w-32 h-32 object-contain"
        />
        <p className="text-gray-500 text-sm mt-2">#{info.indice}</p>
      </section>

      <section className="mt-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">{info.nombre}</h2>

        <div className="flex justify-center gap-2 mt-2">
          {info.listaTipo.map((tipo, index) => (
            <BtnTipos type={tipo} texto={tipo} key={index} />
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <BtnTipos type="nulo" texto={`Peso: ${info.peso} kg`} />
          <BtnTipos type="nulo" texto={`Altura: ${info.alto} cm`} />
        </div>
      </section>
    </main>
  );
}

export default Pokemon;
