import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login_style.css'
import gimg from '../../Assets/logo.png'

export default function Login({saveUserData}) {


const navigate = useNavigate();
const [user, setUser] = useState({
email: "",
password: "",
});
const [spiner, setSpiner] = useState(false);
const [joiErrors, setjoiErrors] = useState([]);
const [apimessage, setapimessage] = useState("");

function getUser(e) {
let inputValue = e.target.value;
let newUser = { ...user };

let propertyName = e.target.id;

newUser[propertyName] = inputValue;

setUser(newUser);
}

function submitUser(e) {
e.preventDefault();
setSpiner(true);
const schema = Joi.object({
email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
password: Joi.string().pattern(/^[a-z]{6,10}$/i).required(),
});

let joiRes = schema.validate(user, { abortEarly: false });
if (joiRes.error) {
setjoiErrors(joiRes.error.details);
} else {
sentUser();
}
}

async function sentUser() {
let { data } = await axios.post(
"https://route-egypt-api.herokuapp.com/signin",
user
);
if (data.message === "success") {
    localStorage.setItem("tkn" , data.token )
    saveUserData()
    setSpiner(true)
navigate("/home");
} else {
setapimessage(data.message);
}
}

function clear(){
    setSpiner(false)
    setjoiErrors([])
    setapimessage("")
}


return (
<>
    <div className="container p-4  ">
        <div className="row g-0 p-4">
            <div className="col-md-6 paner-register"></div>
            <div className="col-md-6 f-register p-3">
            {apimessage.length > 0 ? <div className="toast animate__animated animate__fadeInDown notification" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-body text-center notf-border position-relative ">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {apimessage}
            </div>
        </div> : null}
                <form onSubmit={submitUser}>
                    <div className="d-flex justify-content-center">
                    <img src={gimg} alt="" className="logo-log w-25"/>
                    </div>
                    <h3 className="text-center pt-3 text-muted">
                        Log in to GameOver
                    </h3>

                    <div className="px-4">
                        <div className="input-data">
                            <label htmlFor="email"></label>
                            <input onChange={getUser} onClick={clear} placeholder="Email Address" type="email"
                                className="form-control  " id="email" />
                            <small className="text-danger error-form">
                                {
                                joiErrors.filter((err) => err.context.label === "email")[0]
                                ?.message
                                }
                            </small>
                        </div>
                        <div className="input-data">
                            <label htmlFor="password"></label>
                            <input onChange={getUser} onClick={clear} placeholder="Password" type="password" className="form-control  "
                                id="password" />
                            <small className="text-danger error-form">
                                {
                                joiErrors.filter(
                                (err) => err.context.label === "password"
                                )[0]?.message
                                }
                            </small>
                        </div>
                    </div>
                    <div className="px-4 text-center">
                        <button className="mt-4 w-100 mx-auto">
                            {spiner ? (
                            <i className="fa fa-spin fa-spinner"></i>
                            ) : (
                            "Login"
                            )}
                        </button>
                        <hr />
                        <p className="text-info forgot" onClick={()=>alert("ههه اعمل اكونت جديد")}>Forgot Password?</p>
                        <p>
                        Not a member yet?  
                            <Link to="/register" className="text-info"> Create Account <i className="fas fa-chevron-right small"></i> </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</>
);
}