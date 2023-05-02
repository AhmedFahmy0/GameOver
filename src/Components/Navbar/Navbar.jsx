import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Navbar_style.css"

export default function Navbar({crrUser , logOut}) {

const navigate = useNavigate()
function logOutUser(){
logOut()
navigate("/login")

}

return (
<>
    <nav className="navbar navbar-expand-lg navbar-dark  shadow-sm ">
        <div className="container">
            <Link className="navbar-brand" to="/"><img src={require('../../Assets/logo.png')} alt="" /> <span>Game
                Over</span></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                    {/* {crrUser ? <> */}
                        <li className="nav-item">
                            <Link className="nav-link active text-center" aria-current="page" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-center" to="/all-games">All</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-center" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Platforms
                            </Link>
                            <ul className="dropdown-menu ">
                                <li>
                                    <Link className="dropdown-item text-white text-center" to="/platforms/pc">PC</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item text-white text-center" to="/platforms/browser">Browser</Link>
                                </li>
                                <li></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-center" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                sort-by
                            </Link>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item text-white text-center" to="/'sort-by'/release-date">Release-date</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item text-white text-center" to="/'sort-by'/popularity">Popularity</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item text-white text-center" to="/'sort-by'/alphabetical">Alphabetical</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item text-white text-center" to="/'sort-by'/relevance">Relevance</Link>
                                </li>
                                <li></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-center" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Categories
                            </Link>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item text-white text-center" to="/category/shooter">Shooter</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item text-white text-center" to="/category/racing">Racing</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item text-white text-center" to="/category/sports">Sports</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item text-white text-center" to="/category/social">Social</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item text-white text-center" to="/category/open-World">Open World</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item text-white text-center" to="/category/zombie">Zombie</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item text-white text-center" to="/category/fantasy">Fantasy</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item text-white text-center" to="/category/action-rpg">Action Rpg</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item text-white text-center" to="/category/action">Action</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item text-white text-center" to="/category/flight">Flight</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item text-white text-center" to="/category/battle-royale">Battle Royale</Link>
                                </li>
                                <li></li>
                            </ul>
                        </li>
                    {/* </> : null} */}
                </ul>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {crrUser ? <>
                        <li className="nav-item d-flex align-items-center justify-content-center">
                            Welcome <span className=' mx-3 username fw-bold '> {crrUser.first_name}</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link btn nav-button mx-2 text-center" onClick={logOutUser}>Log out</span>
                        </li>
                    </> : <>
                        <li className="nav-item text-center ">
                            <Link className="nav-link mb-2" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link btn nav-button mx-2 text-center" to="/register">Join Free</Link>
                        </li>
                    </>}
                </ul>
            </div>
        </div>
    </nav>
</>
)
}