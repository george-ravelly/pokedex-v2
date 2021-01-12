import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./style.css";

import pokeball from "../../assets/image/pokebola.png"
import { useState } from "react";

const Header = () => {
    const [ types, setTypes ] = useState([]);
    const [ isLoading, setLoading ] = useState(false);
    const [ search, setSearch ] = useState(null)
    const history = useHistory();

    function searchPokemon(e){
        e.preventDefault();
        if(search === null){
            return
        }
        fetch('http://pokeapi.co/api/v2/pokemon-species/'+search)
            .then(response => response.json())
            .then(data => {
                if(data !== null){
                    history.replace('/pokemon/'+search)
                }
            })
            .catch(err => {
                alert(`Pokemon ${search} não existe!!!`);
                console.log(err)
            })
    }    

    useState(() => {
        fetch('http://pokeapi.co/api/v2/type')
            .then(response => response.json())
            .then(data => {
                setTypes(data.results)
            })
        setLoading(true)
    }, [])

    return(
        <header>
            <div className="header-content">
                <Link className="header text-decoration-none" to="/">
                    Pokedéx
                    <img src={pokeball} alt="pokebola"/>
                </Link>
            </div>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav" style={{'marginLeft':'102px'}}>
                            <li className="nav-item">
                                <Link className="nav-link text-primary" to="/">Home</Link>
                            </li>
                            <li className="dropdown nav-item ml-md-2 ml-0">
                                <a 
                                    className="btn dropdown-toggle text-primary border-0"
                                    href="/region/" 
                                    role="button" 
                                    id="dropRegion" 
                                    data-toggle="dropdown" 
                                    aria-haspopup="true" 
                                    aria-expanded="false"
                                >
                                    Regions
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropRegion">
                                    <Link className="nav-link text-primary" to="/region/2">Kanto</Link>
                                    <Link className="nav-link text-primary" to="/region/6">Jotho</Link>
                                    <Link className="nav-link text-primary" to="/region/4">Hoenn</Link>
                                    <Link className="nav-link text-primary" to="/region/5">Sinnoh</Link>
                                    <Link className="nav-link text-primary" to="/region/9">Unova</Link>
                                    <Link className="nav-link text-primary" to="/region/12">Kalos</Link>
                                    <Link className="nav-link text-primary" to="/region/21">Alola</Link>
                                </div>
                            </li>
                            <li className="nav-item dropdown ml-md-3 ml-0">
                                <a 
                                    className="btn dropdown-toggle text-primary border-0" 
                                    href="/types" 
                                    role="button" 
                                    id="dropType" 
                                    data-toggle="dropdown"
                                    aria-haspopup="true" 
                                    aria-expanded="false"
                                >
                                    Types
                                </a>
                                {isLoading ? (
                                    <div className="dropdown-menu" aria-labelledby="dropType">
                                        {types.map(it => (
                                            <span 
                                                className="nav-link text-primary type" 
                                                style={{cursor: 'pointer'}}
                                                key={it.name} 
                                                //Tentar corrigir o bug mais tarde
                                                onClick={() => history.push('/types/'+it.name)}
                                            >
                                                {it.name}
                                            </span>
                                        ))}                                
                                    </div>
                                ) : (
                                    <span>Loading...</span>
                                )}
                                
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="container">
                    <form className="form-inline my-2 my-lg-0 w-100" onSubmit={searchPokemon}>
                        <label htmlFor="search" className="ml-2 text-primary">Search</label>
                        <input 
                            onChange={e => setSearch(e.target.value)}
                            className="form-control m-2 w-100" 
                            type="search" 
                            placeholder="ex: bulbasaur" 
                            aria-label="Search" 
                            name="search" 
                        />
                    </form>
                </div>
            </div>
        </header>
    )
}

export default Header;