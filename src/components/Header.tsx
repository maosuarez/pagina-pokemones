import "../assets/fonts/PokemonSolidNormal.woff";

function Header() {
  return (
    <header className="flex flex-col items-center sticky bg-custom-background p-4">
      <h1 className="mt-2 text-3xl font-light text-yellow-400 font-pokemon font-['PokemonSolidNormal'] transition-transform duration-200 hover:cursor-help hover:text-blue-400 hover:scale-110 hover:shadow-[4px_4px_0px_#003b5c,-4px_-4px_0px_#003b5c,4px_-4px_0px_#003b5c,-4px_4px_0px_#003b5c,0_4px_0px_#003b5c,0_-4px_0px_#003b5c,4px_0px_0px_#003b5c,-4px_0px_0px_#003b5c]">
        Pokedex de Mao
      </h1>
      <div className="flex justify-center p-2">
        <input
          className="search-input p-2 border-2 border-gray-600 rounded-md mx-2"
          placeholder="Ingresa el pokemon..."
        />
        <button className="search-btn bg-red-600 text-white p-2 rounded-md border-2 border-white transition duration-200 ease-in hover:bg-white hover:text-red-600">
          Buscar
        </button>
      </div>
    </header>
  );
}

export default Header;
