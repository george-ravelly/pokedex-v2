import React, { useEffect, useState } from "react";
import PokemonSprite from "../../components/PokemonSprite";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

function Home() {
    const [ url, setUrl ] = useState('https://pokeapi.co/api/v2/pokemon-species/?limit=21&offset=0');
    const [ data, setData ] = useState({});
    const [ pokemonList, setPokemonList ] = useState([]);
    const [ isLoading, setLoading ] = useState(false)

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setPokemonList(data.results);
            })
        setLoading(true)
    }, [url]);

    function handlerNext(){
        if(data.next === null){
            return;
        }
        setUrl(data.next);
    }

    function handlerPrevious(){
        if(data.previous === null){
            return;
        }
        setUrl(data.previous);
    }

    return(
        <main>
            <Header />
            {isLoading ? (
                <div className="container bg-light mt-2 p-5 rounded">
                    <div className="row">
                        {pokemonList.map(pokemon => (
                            <div className="col-md-4 col-12 mb-3 mb-md-1 d-flex justify-content-center" key={pokemon.name}>
                                <Link className="text-decoration-none" to={`/pokemon/${pokemon.name}`}>
                                    <div style={{width: '175px', height: '175px'}}>
                                        <PokemonSprite url={pokemon.url}/><br />
                                    </div>
                                    <strong className="p-4 text-capitalize" style={{fontSize: '1.4rem'}}>
                                        {pokemon.name}
                                    </strong>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-between align-item-center mt-5">
                        <button 
                            className="btn btn-outline-secondary ml-5"
                            onClick={() => handlerPrevious()}
                        >
                            Anterior
                        </button>
                        <button 
                            className="btn btn-outline-primary mr-5"
                            onClick={() => handlerNext()}
                        >   
                            Proximo
                        </button>
                    </div>
                </div>
            ) : (
                <div 
                    className="spinner-border text-primary d-flex justify-content-center align-center" 
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            )}
            <Footer />
        </main>
    )
}

export default Home;