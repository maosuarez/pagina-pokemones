import { Dispatch, SetStateAction, useEffect, useState } from "react";

function Navbar({
  cambiarPantalla,
  pantallaActual,
}: {
  cambiarPantalla: Dispatch<SetStateAction<string>>;
  pantallaActual: string;
}) {
  const [textoAnterior, setTextoAnterior] = useState("");
  const [textoSiguiente, setTextoSiguiente] = useState("");

  const [anterior, setAnterior] = useState("");
  const [siguiente, setSiguiente] = useState("");

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
    consultarApi(pantallaActual).then((data) => {
      if (data.previous) {
        setTextoAnterior(
          "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        );
        setAnterior(data.previous);
      } else {
        setTextoAnterior(
          "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hidden"
        );
      }
      if (data.next) {
        setTextoSiguiente(
          "bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        );
        setSiguiente(data.next);
      } else {
        setTextoSiguiente(
          "bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hidden"
        );
      }
    });
  }, [pantallaActual]);

  return (
    <nav className="p-2 mb-4">
      <div className="flex justify-center items-center gap-2 ">
        <button
          onClick={() => {
            cambiarPantalla(anterior);
          }}
          className={textoAnterior}
        >
          Anterior
        </button>
        <button
          onClick={() => {
            cambiarPantalla(siguiente);
          }}
          className={textoSiguiente}
        >
          Siguiente
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
