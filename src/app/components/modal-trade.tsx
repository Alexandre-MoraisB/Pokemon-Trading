export default function ModalTrade({userPokemons, tradePokemons, setShowModal}: {userPokemons: any, tradePokemons: any, setShowModal: Function}): JSX.Element {

  return (
    <>
      <div id="default-modal" aria-hidden="true" className="overflow-y-auto overflow-x-hidden ml-[33%] mt-[10%] fixed z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
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
                O valor experiência de seus pokémons em total é de: {userPokemons.reduce((a: any, v: { base_experience: any }) =>  a = a + v.base_experience , 0 )}
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                O valor experiência dos pokémons a serem rebidos é de: {tradePokemons.reduce((a: any, v: { base_experience: any }) =>  a = a + v.base_experience , 0 )}
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                A diferença de pontos entre os pokémons é de: {Math.abs(tradePokemons.reduce((a: any, v: { base_experience: any }) =>  a = a + v.base_experience , 0 ) - userPokemons.reduce((a: any, v: { base_experience: any }) =>  a = a + v.base_experience , 0 ))}
              </p>
              {Math.abs(tradePokemons.reduce((a: any, v: { base_experience: any }) =>  a = a + v.base_experience , 0 ) - userPokemons.reduce((a: any, v: { base_experience: any }) =>  a = a + v.base_experience , 0 )) >= 50 ?
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
    </>
  )
}
