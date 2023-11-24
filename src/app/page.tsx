'use client'
import {useEffect, useState} from "react";

export default function Home(): JSX.Element {
  const [pokemonStrings, setPokemonStrings] = useState<any[]>([])
  const [pokemonArray, setPokemonArray] = useState<any[]>([])
  const [userPokemons, setUserPokemons] = useState<any[]>([])
  const [tradePokemons, setTradePokemons] = useState<any[]>([])

  const [userValidName, setUserValidName] = useState<any>(true)
  const [tradeValidName, setTradeValidName] = useState<any>(true)

  const [showModal, setShowModal] = useState<any>(false)


  useEffect(() => {
    (async () => {
      const tmpPokemonArray = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1300}`).then(res => res.json())

      setPokemonArray(tmpPokemonArray.results)
      setPokemonStrings(tmpPokemonArray.results.map((objeto: any) => {
        return objeto.name
      }))


    })()
  }, [])

  async function addToUserInventary(mode: any = undefined): Promise<void> {
    const input: HTMLInputElement = document.getElementById(mode === 'user' ? 'user-pokemon-input' : 'trade-pokemon-input') as HTMLInputElement
    const nomePokemon = input.value.toLowerCase()
    if (pokemonStrings.includes(nomePokemon)) {

      // Não inlcuí exclusividade dentro do Array pois é possível se ofertar 2 "pokémons" iguais.
      const pokemonSelecionado = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}/`)
        .then(res => res.json())

      if (mode === 'user') {
        if (userPokemons.length >= 6) {
          return
        }
        setUserPokemons(prevState => ([
          ...prevState,
          pokemonSelecionado
        ]))
      } else {
        if (tradePokemons.length >= 6) {
          return
        }
        setTradePokemons(prevState => ([
          ...prevState,
          pokemonSelecionado
        ]))
      }

    } else {
      if (mode === 'user') {
        setUserValidName(false)
      } else {
        setTradeValidName(false)
      }
    }
  }

  function clearAlert(mode: any = undefined): void {
    if (mode === 'user') {
      setUserValidName(true)
    } else {
      setTradeValidName(true)
    }
  }

  function openModal(): void {
    setShowModal(!showModal)
  }

  function clearOffer(mode: any = undefined): void {
    if (mode == 'user') {
      setUserPokemons(() => ([]))
    } else {
      setTradePokemons(() => ([]))
    }
  }

  function removePokemon(mode: any, index: number): void {
    if (mode == 'user') {
      const tmpArray: any[] = userPokemons
      tmpArray.splice(index, 1)
      setUserPokemons(() => ([
        ...tmpArray
      ]))
    } else {
      const tmpArray: any[] = tradePokemons
      tmpArray.splice(index, 1)

      setTradePokemons(() => ([
        ...tmpArray
      ]))

    }
  }


  return (
    <>
      <div className={'flex flex-grow justify-center'}>
        <button onClick={openModal} data-modal-target="default-modal" data-modal-toggle="default-modal"
                className="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                type="button">
          Avaliar troca
        </button>
      </div>

      <div className={'flex flex-row'}>
        <div className={'m-4'}>
          <input type='text' id='user-pokemon-input' list='pokemon-list'  onChange={() => {clearAlert('user')}}  className={`max-h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 ${userValidName ? 'dark:border-gray-600' : 'dark:border-red-600 '} dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
          <datalist id='pokemon-list' onClick={(event) => console.log(event.currentTarget)}>
            {pokemonArray.map((pokemonObject) => {
              // string contains '-' remove
              return <option key={pokemonObject.name} value={pokemonObject.name}>{pokemonObject.name}</option>
            })}
          </datalist>

          <button className="btn btn-blue ml-2" onClick={() => addToUserInventary('user')}>Adicionar seu pokémon</button>
          <button className="btn btn-blue ml-2" onClick={() => clearOffer('user')}>Limpar oferta</button>
        </div>

        <div className={'flex flex-grow justify-end m-4'}>

          <input type='text' id='trade-pokemon-input' list='pokemon-list'  onChange={() => {clearAlert('trade')}}  className={`max-h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 ${tradeValidName ? 'dark:border-gray-600' : 'dark:border-red-600 '} dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}/>
          <datalist id='pokemon-list' onClick={(event) => console.log(event.currentTarget)}>
            {pokemonArray.map((pokemonObject) => {
              return <option key={pokemonObject.name} value={pokemonObject.name}>{pokemonObject.name}</option>
            })}
          </datalist>

          <button className="btn btn-blue ml-2"onClick={() => addToUserInventary('trade')}>Adicionar pokémon para trocar</button>
          <button className="btn btn-blue ml-2" onClick={() => clearOffer('trade')}>Limpar oferta</button>
        </div>
      </div>
      <div className={'grid grid-cols-2 gap-x-20'}>
        <div className={'grid grid-cols-3 gap-4'}>

          {userPokemons.map((pokemonObject, index: number) => {
            return <div key={pokemonObject.id} className="col-2 card bg-base-100 shadow-xl min-h-[20em] max-h-[20em]">
              <figure><img src={pokemonObject.sprites.front_default} alt={pokemonObject.name} /></figure>
              <div className="card-body">
                <h2 className="card-title">{pokemonObject.name}</h2>
                <p>Valor de experiência base: {pokemonObject.base_experience}</p>
                <div className="card-actions justify-end">
                  <button onClick={() => {removePokemon('user', index)}} className="btn btn-danger">Remover</button>
                </div>
              </div>
            </div>
          })}

        </div>

        <div className={'grid grid-cols-3 gap-4'}>

          {tradePokemons.map((pokemonObject, index: number) => {
            return <div key={pokemonObject.id} className="col-2 card bg-base-100 shadow-xl min-h-[20em] max-h-[20em]">
              <figure><img src={pokemonObject.sprites.front_default} alt={pokemonObject.name} /></figure>
              <div className="card-body">
                <h2 className="card-title">{pokemonObject.name}</h2>
                <p>Valor de experiência base: {pokemonObject.base_experience}</p>
                <div className="card-actions justify-end">
                  <button onClick={() => {removePokemon('trade', index)}} className="btn btn-danger">Remover</button>
                </div>
              </div>
            </div>
          })}

        </div>
      </div>
      {showModal &&
        <div id="default-modal" tabindex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden ml-[33%] mt-[10%] fixed z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Avaliação de troca
                </h3>
                <button onClick={() => {setShowModal(false)}} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    O limite de pokémons que podem ser ofertados, para cada lado, é 6.
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  O valor experiência de seus pokémons em total é de: {userPokemons.reduce((a,v) =>  a = a + v.base_experience , 0 )}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  O valor experiência dos pokémons a serem rebidos é de: {tradePokemons.reduce((a,v) =>  a = a + v.base_experience , 0 )}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    A diferença de pontos entre os pokémons é de: {Math.abs(tradePokemons.reduce((a,v) =>  a = a + v.base_experience , 0 ) - userPokemons.reduce((a,v) =>  a = a + v.base_experience , 0 ))}
                </p>
                {Math.abs(tradePokemons.reduce((a,v) =>  a = a + v.base_experience , 0 ) - userPokemons.reduce((a,v) =>  a = a + v.base_experience , 0 )) >= 50 ?
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      A troca ofertada é injusta.
                  </p>
                : <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      A troca ofertada pode ser justa, pois diferença entre pontos é pequena. Avalie suas necessidades e o quão bem os pokémons se adaptariam a sua composição.
                  </p>
                }
              </div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button onClick={() => {setShowModal(false)}} data-modal-hide="default-modal" type="button" className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Ok</button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
