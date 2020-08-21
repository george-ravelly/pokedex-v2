import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Moves = (props) => {
    const id = props.id;
    const [ tutor, setTutor ] = useState([]);
    const [ machine, setMachine ] = useState([])
    const [ egg, setEgg ] = useState([])
    const [ levelUp, setLevelUp ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        fetch('http://pokeapi.co/api/v2/pokemon/'+id)
            .then(response => response.json())
            .then(data => {
                const natural = data.moves.filter((el) => {
                    return el.version_group_details[0].move_learn_method.name === "level-up";
                });
                setLevelUp(natural);

                const tutorMoves = data.moves.filter((el) => {
                    return el.version_group_details[0].move_learn_method.name === "tutor";
                });
                setTutor(tutorMoves);

                const machineMoves = data.moves.filter((el) => {
                    return el.version_group_details[0].move_learn_method.name === "machine";
                });
                setMachine(machineMoves);

                const eggMoves = data.moves.filter((el) => {
                    return el.version_group_details[0].move_learn_method.name === "egg";
                });
                setEgg(eggMoves);
                setIsLoading(true);
            }).catch(err => {
                console.log(err)
            })
    }, [id])

    return (
        <div>
            {isLoading ? (
                <div className="w-100 row">
                    <div className="col-6">
                        <p className="text-dark font-weight-bold" style={{fontSize : '1.6rem'}}>
                            Natural Moves
                        </p>
                        {levelUp.map(it => (
                            <p className="text-primary text-capitalize" key={it.move.name}>{it.move.name}</p>
                        ))}
                    </div>
                    <div className="col-6">
                        <p className="text-dark font-weight-bold" style={{fontSize : '1.6rem'}}>
                            Tutor Moves
                        </p>
                        {tutor.map(it => (
                            <p className="text-primary text-capitalize" key={it.move.name}>{it.move.name}</p>
                        ))}
                    </div>
                    <div className="col-6">
                        <p className="text-dark font-weight-bold" style={{fontSize : '1.6rem'}}>
                            Machine Moves
                        </p>
                        {machine.map(it => (
                            <p className="text-primary text-capitalize" key={it.move.name}>{it.move.name}</p>
                        ))}
                    </div>
                    <div className="col-6">
                        <p className="text-dark font-weight-bold" style={{fontSize : '1.6rem'}}>
                            Egg Moves
                        </p>
                        {egg.map(it => (
                            <p className="text-primary text-capitalize" key={it.move.name}>{it.move.name}</p>
                        ))}
                    </div>
                </div>
            ) : (
                <span>Carregando...</span>
            )}
        </div>
    )
}

export default Moves;