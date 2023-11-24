export default function PokemonCards({arrayPokemons, mode,removePokemon}: {arrayPokemons: any, mode: string, removePokemon: Function}): JSX.Element {

  return (
      <>
        <div className={'grid grid-cols-3 gap-4'}>
          {arrayPokemons.map((pokemonObject: any, index: number) => {
            return <div key={index} className="col-2 card bg-base-100 shadow-xl min-h-[20em] max-h-[20em]">
              <figure><img src={pokemonObject.sprites.front_default} alt={pokemonObject.name} /></figure>
              <div className="card-body">
                <h2 className="card-title">{pokemonObject.name}</h2>
                <p>Valor de experiência base: {pokemonObject.base_experience}</p>
                <div className="card-actions justify-end">
                  <button onClick={() => {removePokemon(mode, index)}} className="btn btn-danger">Remover</button>
                </div>
              </div>
            </div>
          })}
        </div>
      </>
  )
}
