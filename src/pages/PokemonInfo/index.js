import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";

import Weaks from "../../components/PokeComponents/weaks.js";
import Description from "../../components/PokeComponents/description";

import "./style.css";
import EvolutionChain from "../../components/PokeComponents/evolutionChain";
import Moves from "../../components/PokeComponents/moves";


const PokemonInfo = () => {
    const { name } = useParams();
    const [ pokemon, setPokemon ] = useState({});
    const [ species, setSpecies ] =  useState({});
    const [ chain, setChain ] = useState('')
    const [ types, setTypes ] = useState([]);
    const [ stats, setStats ] = useState([]);
    const [ abilities, setAbilities ] = useState([]);
    const [ sprite, setSprite ] = useState('');
    const [ isLoading, setLoading ] = useState(false);
    const [ egg, setEgg ] = useState([]);
    const [ growth, setGrowth ] = useState('');
    const [ habitat, setHabitat ] = useState({});
   
    function moreDetails(id){
        fetch('https://pokeapi.co/api/v2/pokemon/'+id)
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
        fetch('https://pokeapi.co/api/v2/pokemon-species/'+name)
            .then(response => response.json())
            .then(data => {
                setSpecies(data);
                setChain(data.evolution_chain.url)
                moreDetails(data.id);
                setEgg(data.egg_groups);
                setGrowth(data.growth_rate.name);
                setHabitat(data.habitat);
            }).then(() => {
                setLoading(true)
            })
            .catch(error => {
                console.warn(error);
            })
    }, [name]);
    return(
        <main>
            <Header />
            {isLoading ? (
                <div className="mt-3 mb-3 bg-light p-5">
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
                                <h1 className="mr-3 text-uppercase text-primary">#{pokemon.id+' '+pokemon.name}</h1>
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
                                    <table className="table table-borderless table-responsive">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Weight</th>
                                                <td>{pokemon.weight/10}kg</td>
                                                <th scope="row">Height</th>
                                                <td>{pokemon.height/10}m</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Growth Rate</th>
                                                <td className="text-capitalize">{growth}</td>
                                                <th scope="row" >Habitat</th>
                                                <td className="text-capitalize">{habitat !== null ? (
                                                    habitat.name
                                                ): (
                                                    <span>Undefined</span> 
                                                )}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Capture Rate</th>
                                                <td>{((species.capture_rate*100)/255).toFixed(1)}%</td>
                                                <th scope="row">Gender Rate</th>
                                                <td className="text-capitalize">
                                                    {`${100-((species.gender_rate/8)*100)}% ♂ ${((species.gender_rate/8)*100)}% ♀`}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Egg Groups</th>
                                                <td className="text-capitalize">
                                                    {egg.map(results => (
                                                            <span className="d-block" key={results.name}>{results.name}</span>
                                                    ))}
                                                </td>  
                                                <th scope="row">Abilities</th>
                                                <td>{abilities.map(results => (
                                                        <span 
                                                            className="text-capitalize"
                                                            key={results.ability.name}
                                                        >
                                                            {results.is_hidden ? (
                                                                <span className="text-secondary">
                                                                    {results.ability.name}
                                                                </span>
                                                            ) : (
                                                                <span className="text-dark">{results.ability.name}</span>
                                                            )}<br />
                                                        </span>
                                                    ))}
                                                </td>                                                  
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <Description name={name} />
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
                                                <th className="text-capitalize text-dark" scope="row">
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
                        <div className="row">
                            <div className="col-12">
                                <h4 className="p-3 text-dark rounded">Weaknesses</h4>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Double Damage</th>
                                            <th>Half Damage</th>
                                        </tr>
                                    </thead>
                                    <tbody className="mb-4">
                                        {types.map(it => (
                                            <Weaks key={it.type.url} url={it.type.url} />                                
                                        ))}
                                    </tbody>                                    
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mb-5">
                                <h4 className="p-3 text-dark rounded" style={{textAlign: "center"}}>Evolution Chain</h4>
                            </div>
                            {species.evolution_chain === null ? (
                                <span className="text-secondary">Does not evolve.</span>
                            ): (
                                <EvolutionChain url={chain} />
                            )}
                            <hr />
                            <div className="col-12 container mt-5">
                                {pokemon.id === undefined ? (
                                    <span className="text-secondary"></span>
                                ): (
                                    <div className="col-12">
                                        <Moves id={pokemon.id} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            ) : (
                <div className="row">
                    <div 
                        className="spinner-border text-primary d-flex justify-content-center align-center" 
                        role="status"
                    >
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
            <Footer />
        </main>
    )    
}


export default PokemonInfo;