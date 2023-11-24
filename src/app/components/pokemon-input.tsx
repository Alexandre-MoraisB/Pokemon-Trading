export default function PokemonInput({pokemonArray, clearAlert, addToUserInventary, clearOffer, modeValidName, mode, inputId}: {pokemonArray: any, clearAlert: Function, addToUserInventary: Function, clearOffer: Function, modeValidName: Function, mode: String, inputId: string}): JSX.Element {
  return (
    <>
      <input type='text' id={inputId} list='pokemon-list'  onChange={() => {clearAlert(mode)}}  className={`max-h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 ${modeValidName ? 'dark:border-gray-600' : 'dark:border-red-600 '} dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
      <datalist id='pokemon-list' onClick={(event) => console.log(event.currentTarget)}>
        {pokemonArray.map((pokemonObject: any) => {
          return <option key={pokemonObject.name} value={pokemonObject.name}>{pokemonObject.name}</option>
        })}
      </datalist>

      <button className="btn btn-blue ml-2"onClick={() => addToUserInventary(mode)}>Adicionar pokémon para trocar</button>
      <button className="btn btn-blue ml-2" onClick={() => clearOffer(mode)}>Limpar oferta</button>
    </>
  )
}
