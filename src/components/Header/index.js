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
        fetch('https://pokeapi.co/api/v2/pokemon-species/'+search)
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
        fetch('https://pokeapi.co/api/v2/type')
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
                    Geodex
                    <img src={pokeball} alt="pokebola"/>
                </Link>
            </div>
            <nav className="navbar navbar-expand-lg" style={{backgroundColor: "#e3f2fd"}}>
                <ul className="nav w-100 d-flex justify-content-center">
                    <li className="nav-item">
                        <Link className="nav-link text-primary" to="/">HOME</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a 
                            className="btn dropdown-toggle text-primary border-0"
                            href="/region/" 
                            role="button" 
                            id="dropRegion" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false"
                        >
                            REGIONS
                        </a>
                        <div className="dropdown-menu" aria-labelledby="dropRegion">
                            <Link className="nav-link text-primary" to="/region/2">Kanto</Link>
                            <Link className="nav-link text-primary" to="/region/3">Jotho</Link>
                            <Link className="nav-link text-primary" to="/region/4">Hoenn</Link>
                            <Link className="nav-link text-primary" to="/region/5">Sinnoh</Link>
                            <Link className="nav-link text-primary" to="/region/9">Unova</Link>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a 
                            className="btn dropdown-toggle text-primary border-0" 
                            href="/types" 
                            role="button" 
                            id="dropType" 
                            data-toggle="dropdown"
                            aria-haspopup="true" 
                            aria-expanded="false"
                        >
                            TYPE
                        </a>
                        {isLoading ? (
                            <div className="dropdown-menu" aria-labelledby="dropType">
                                {types.map(it => (
                                    <span 
                                        className="nav-link text-primary type text-capitalize" 
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
                {/* <div className="collapse navbar-collapse nav justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
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
                                <Link className="nav-link text-primary" to="/region/3">Jotho</Link>
                                <Link className="nav-link text-primary" to="/region/4">Hoenn</Link>
                                <Link className="nav-link text-primary" to="/region/5">Sinnoh</Link>
                                <Link className="nav-link text-primary" to="/region/9">Unova</Link>
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
                                            className="nav-link text-primary type text-capitalize" 
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
                </div> */}
            </nav>
            <div className="container mt-4">
                <form className="form-inline my-2 my-lg-0 w-100" onSubmit={searchPokemon}>
                    <label htmlFor="search" className="ml-2 text-primary">Search</label>
                    <input 
                        onChange={e => setSearch((e.target.value).toLowerCase())}
                        className="form-control m-2 w-100" 
                        type="search" 
                        placeholder="ex: bulbasaur" 
                        aria-label="Search" 
                        name="search" 
                    />
                </form>
            </div>
        </header>
    )
}

export default Header;