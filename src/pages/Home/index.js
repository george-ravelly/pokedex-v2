import React, { useEffect, useState } from "react";
import PokemonSprite from "../../components/PokemonSprite";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

function Home() {
    const [ url, setUrl ] = useState('https://pokeapi.co/api/v2/pokemon?limit=3&offset=0');
    const [ data, setData ] = useState({});
    const [ pokemonList, setPokemonList ] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setPokemonList(data.results);
            })
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
            <div className="container bg-light mt-2 p-5 rounded">
                <div className="row">
                    {pokemonList.map(pokemon => (
                        <div className="col-4 d-flex justify-content-center" key={pokemon.name}>
                            <Link className="text-decoration-none" to="/pokemon/id">
                                <PokemonSprite name={pokemon.name}/><br />
                                <strong className="p-4 text-capitalize" style={{fontSize: '1.6rem'}}>
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
            <footer className="text-center mt-2 bg-primary text-light p-3 mb-0">
                <p>
                    Este é o footer
                </p>
            </footer>
        </main>
    )
}

export default Home;