import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Home_style.css'
import { Link , useNavigate } from 'react-router-dom'
import Loading from './../Loading/Loading';

export default function Home() {

const [allgames, setAllGames] = useState([]);
let navigate = useNavigate()
async function getGames() {
let { data } = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games`, {
params: { 'sort-by': 'popularity' },
headers: {
'X-RapidAPI-Key': 'fc42eedff7msh1176cf883aee197p199b36jsn12e2a3062d67',
'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
}
})
setAllGames(data)
}
useEffect(() => {
getGames()
}, [])
function getDetails(id) {
navigate(`/game-details/${id}`)
}

return (
<>
    <section>
        <div className='text-center home-paner'>
            <h3 className='fs-1 text-white-50 fw-bold'>Find & track the best <span
                    className='text-info'>free-to-play</span> games!</h3>
            <p className='fs-5 text-muted py-3'>Track what you've played and search for what to play next! Plus get free
                premium loot! </p>
            <Link to='/all-games'><button className='btn btn-outline-secondary'>Browse Games</button></Link>
        </div>
    </section>
    <section>
        <div className="container my-5">
            <div className="row">
                <h3 className='text-white-50 mb-4'><i className="fa-solid fa-robot"></i> Personalized Recommendations
                </h3>
                {allgames.length > 0 ? allgames.slice(0, 3).map((game, index) =>
                <div key={index} className='col-md-4 mb-4'>
                    <div onClick={()=> { getDetails(game.id) }} title={game.platform === "PC (Windows)" ? 'Avaliable onWindows' : 'Avaliable on Browser'} className='shadow game-card'>
                        <img className='w-100' src={game.thumbnail} alt={game.title} />
                        <div className="p-3 game-card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className='text-truncate text-white-50'>{game.title}</h4>
                                <h6 className='text-white free p-2'>FREE</h6>
                            </div>
                        </div>
                    </div>
                </div>
                ) :
                <Loading />}
            </div>
        </div>
    </section>
</>
)
}