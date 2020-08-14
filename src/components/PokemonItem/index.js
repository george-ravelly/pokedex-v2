import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PokemonSprite from "../PokemonSprite"
import Description from "./description";



const PokemonItem = () => {
    const { name } = useParams();
    const [ pokemon, setPokemon ] = useState([]);
    const [ types, setTypes ] = useState([]);
    const [ stats, setStats ] = useState([]);
    const [ abilities, setAbilities ] = useState([]);
    const [ species, setSpecies ] = useState({})
   

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/'+name)
            .then(response => response.json())
            .then(data => {
                setPokemon(data);
                setTypes(data.types);
                setStats(data.stats);
                setAbilities(data.abilities);
                setSpecies(data.species);
            }
        )
    }, [name]);

    return(
        <div className="container mt-3 mb-3 bg-light p-5">
            <div className="container w-100">
                <div className="row">
                    <div className="col-6">
                        <div 
                            className="d-flex align-items-center justify-content-center"
                        >
                            <PokemonSprite url={species.url}/><br />
                        </div>
                    </div>
                    <div className="col-6">
                        <h1 className="mr-3 text-capitalize">#{pokemon.id+' - '+pokemon.name}</h1>
                        <p className="text-secondary">
                            <strong className="mr-3">Weight: {pokemon.weight/100} Kg</strong>
                            <strong>Height: {pokemon.height/100} m</strong>
                        </p>
                        <p className="text-secondary">
                            <strong>Types: </strong>
                            {types.map(results => (
                                <span 
                                    className="mr-2 text-light rounded p-1" 
                                    key={results.type.name}
                                    style={{background: `var(--color-${results.type.name})`}}
                                >
                                    {results.type.name}
                                </span>
                            ))}
                        </p>
                        <p className="text-secondary">
                            <strong>Abilities: </strong>
                            {abilities.map(results => (
                                <span 
                                    className="mr-2"
                                    key={results.ability.name}
                                >
                                    {results.ability.name}
                                </span>
                            ))}
                        </p>
                        <div className="text-secondary">
                            <h3>Description:</h3>
                            <Description url={species.url} />
                        </div>
                    </div>
                    <div className="col-12">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Stats</th>
                                    <th scope="col">Base Stats</th>
                                </tr>
                            </thead>
                            {stats.map(results => (
                                <tbody key={results.stat.name}>
                                    <tr>
                                        <th scope="row">
                                            {results.stat.name}
                                        </th>
                                        <td>
                                            {results.base_stat}
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                </div>
                
            </div>
        </div>
    )
}


export default PokemonItem;
    