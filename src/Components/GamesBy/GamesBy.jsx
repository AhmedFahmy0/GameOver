/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'



export default function GamesBy() {


    let navigate = useNavigate()
    const [count, setCount] = useState(20)
const [plats, setplats] = useState([])
let {platf} =  useParams()
let {cat} =  useParams()
let {sort} =  useParams()

async function getGamePlatforms(){
    let {data} = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games', {
        params : {platform : platf ,  category: cat , 'sort-by': sort } ,
        headers: {
            'X-RapidAPI-Key': '4e061ef2b5msh857384c11d97778p139fcajsne94a3c9657d3',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    })
    setplats(data)
}

useEffect(() => {
    getGamePlatforms()
    }, [platf , cat , sort])

    function getDetails(id){
        navigate(`/game-details/${id}`)
    }

    function moreGames(){
        let newCount = count
        newCount += 20
        setCount(newCount)
    }


    return (
    <>
    <div className="container text-center my-5">
            <div className="row">
                {plats.length > 0 ? plats.slice(0, count).map((game, index) =>
                    <div key={index} className='col-sm-6 col-md-4 col-lg-3 mb-4'>
                        <div onClick={() => { getDetails(game.id) }} title={game.platform === "PC (Windows)" ? 'Avaliable on Windows' : 'Avaliable on Browser'} className='shadow game-card'>
                            <img className='w-100' src={game.thumbnail} loading="lazy" alt={game.title} />
                            <div className="p-3 game-card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h4 className='text-truncate text-white-50'>{game.title}</h4>
                                    <h6 className='text-white free p-2'>FREE</h6>
                                </div>
                                <p className='text-truncate text-muted'>{game.short_description}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <i className="fa-solid fa-square-plus text-white-50"></i>
                                    <div>
                                        <span className='category px-2 rounded-3 me-2'>{game.genre}</span>
                                        {game.platform === 'PC (Windows)' ? <i className="fa-brands fa-windows text-secondary"></i> : <i className="fa-brands fa-chrome text-secondary"></i>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <Loading />}
            </div>
            {count > plats.length ? null : <button onClick={moreGames} className='btn btn-outline-secondary my-4 fs-5'>More Games <i className="fas fa-chevron-right small"></i> </button>}
        </div>
    </>
    )
}
