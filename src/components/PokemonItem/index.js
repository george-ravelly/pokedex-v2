import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PokemonItem = () => {
    const { name } = useParams();
    const [ pokemon, setPokemon ] = useState([]);
    const [ types, setTypes ] = useState([]);
    const [ stats, setStats ] = useState([]);
    const [ abilities, setAbilities ] = useState([]);
    const [ sprite, setSprite ] = useState({})

    const loadPokemon = async () => {
        fetch('https://pokeapi.co/api/v2/pokemon/'+name)
            .then(response => response.json())
            .then(data => {
                setPokemon(data);
                setTypes(data.types);
                setStats(data.stats);
                setAbilities(data.abilities);
                setSprite(data.sprites.other.dream_world);
            }
        )

    }

    useEffect(() => {
        loadPokemon();
    }, [name]);

    return(
        <div className="container mt-3 mb-3 bg-light p-5">
            <div className="container w-100">
                <div className="row">
                    <div className="col-6">
                        <div className="d-flex align-items-center justify-content-center">
                            <img src={sprite.front_default} alt="pokemon sprite"/>
                        </div>
                    </div>
                    <div className="col-6">
                        <h1 className="mr-3 text-capitalize">#{pokemon.order+' - '+pokemon.name}</h1>
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
    