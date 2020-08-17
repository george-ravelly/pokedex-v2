import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import { useParams } from "react-router-dom";

import "./style.css";

const PokemonInfo = () => {
    const { name } = useParams();
    const [ pokemon, setPokemon ] = useState({});
    const [ species, setSpecies ] =  useState({});
    const [ types, setTypes ] = useState([]);
    const [ stats, setStats ] = useState([]);
    const [ abilities, setAbilities ] = useState([]);
    const [ description, setDescription ] = useState('');
    const [ sprite, setSprite ] = useState('');
    const [ isLoading, setLoading ] = useState(false);
   
    async function moreDetails(id){
        fetch('http://pokeapi.co/api/v2/pokemon/'+id)
            .then(response => response.json())
            .then(data => {
                setPokemon(data);
                setTypes(data.types);
                setStats(data.stats);
                setAbilities(data.abilities);
                setSprite(() => {
                    if(data.sprites.other.dream_world.front_default !== null){
                        return data.sprites.other.dream_world.front_default;
                    }else{
                        return data.sprites.front_default;
                    }
                })
            }
        )
    }

    useEffect(() => {
        fetch('http://pokeapi.co/api/v2/pokemon-species/'+name)
            .then(response => response.json())
            .then(data => {
                setSpecies(data);
                moreDetails(data.id);
                selectFlavorText(data.flavor_text_entries);
            }
        )
        setLoading(true)
    }, [name]);

    function selectFlavorText(flavors){
        for(let i = 0; i < flavors.length; i++){
            if(flavors[i].language.name === 'en'){
                setDescription(flavors[i].flavor_text);
                break;
            }
        }
    }

    return(
        <main>
            <Header />
            {isLoading ? (
                <div className="container mt-3 mb-3 bg-light p-5">
                    <div className="container w-100">
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <div 
                                    className="d-flex align-items-center justify-content-center"
                                >
                                    <div className="sprite-container">
                                        <img src={sprite} alt="sprite"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <h1 className="mr-3 text-uppercase">#{pokemon.id+' '+pokemon.name}</h1>
                                <p className="text-secondary">
                                    {types.map(results => (
                                        <span 
                                            className="mr-2 text-light rounded p-1 text-uppercase font-weight-bold" 
                                            key={results.type.name}
                                            style={{background: `var(--color-${results.type.name})`}}
                                        >
                                            {results.type.name}
                                        </span>
                                    ))}
                                </p>
                                <div className="text-secondary">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th scope="row">Weight</th>
                                                <td className="pl-2">{pokemon.weight/10}kg</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Height</th>
                                                <td className="pl-2">{pokemon.height/10}m</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Capture Rate</th>
                                                <td className="pl-2">{species.capture_rate}%</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Abilities</th>
                                                <td className="pl-2">{abilities.map(results => (
                                                        <span 
                                                            className="mr-2 text-capitalize"
                                                            key={results.ability.name}
                                                        >
                                                            {results.ability.name}
                                                        </span>
                                                    ))}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="text-secondary mt-2">
                                    <h3>Description:</h3>
                                    <p>{description}</p>
                                </div>
                            </div>
                            <div className="col-12 mt-5">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Stats</th>
                                            <th scope="col">Base Stats</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.map(results => (
                                            <tr key={results.stat.name}>
                                                <th className="text-capitalize" scope="row">
                                                    {results.stat.name}
                                                </th>
                                                <td>
                                                    {results.base_stat}
                                                </td>
                                            </tr>
                                            
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
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


export default PokemonInfo;