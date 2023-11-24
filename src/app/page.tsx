'use client'
import {useEffect, useState} from "react";
import PokemonCards from "@/app/components/pokemon-cards";
import ModalTrade from "@/app/components/modal-trade";
import PokemonInput from "@/app/components/pokemon-input";

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
    if (!input || !input.value) return
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
      setUserPokemons(() => ([
        ...[]
      ]))
    } else {
      setTradePokemons(() => ([
        ...[]
      ]))
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
          <PokemonInput mode={'user'} inputId={'user-pokemon-input'} pokemonArray={pokemonArray} clearAlert={clearAlert} addToUserInventary={addToUserInventary} clearOffer={clearOffer} modeValidName={userValidName}></PokemonInput>
        </div>

        <div className={'flex flex-grow justify-end m-4'}>
          <PokemonInput mode={'trade'} inputId={'trade-pokemon-input'} pokemonArray={pokemonArray} clearAlert={clearAlert} addToUserInventary={addToUserInventary} clearOffer={clearOffer} modeValidName={tradeValidName}></PokemonInput>
        </div>

      </div>
      <div className={'grid grid-cols-2 gap-x-20'}>

          <PokemonCards arrayPokemons={userPokemons} removePokemon={removePokemon} mode={'user'}></PokemonCards>

          <PokemonCards arrayPokemons={tradePokemons} removePokemon={removePokemon} mode={'trade'}></PokemonCards>

      </div>
      {showModal &&
        <ModalTrade userPokemons={userPokemons} tradePokemons={tradePokemons} setShowModal={setShowModal}></ModalTrade>
      }
    </>
  )
}
