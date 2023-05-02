import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register_style.css";


export default function Register() {

  const navigate =  useNavigate()
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: 0,
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
      first_name: Joi.string().alphanum().min(3).max(10).required(),
      last_name: Joi.string().alphanum().min(3).max(10).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .pattern(/^[a-z]{6,10}$/i)
        .required(),
      age: Joi.number().min(18).max(60).required(),
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
      "https://route-egypt-api.herokuapp.com/signup",
      user
    );
    setSpiner(true);
    if (data.message === "success") {
      navigate('/login')
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
            {apimessage.length === 0
              ? null
              : <div className="alert alert-danger ">{apimessage.slice(33,)}</div>}
            {/* {joiErrors===null? '' : joiErrors.map((error , i)=>  <div key={i} className='alert alert-danger'>{error.message} </div> ) } */}
            <form onSubmit={submitUser}>
              <h3 className="text-center pt-3 text-muted">
                Create My Account!
              </h3>
              <div className="row justify-content-evenly px-4 ">
                <div className="col-md-6 input-data ">
                  <label htmlFor="first_name"></label>
                  <input
                    onClick={clear}
                    onChange={getUser}
                    placeholder="First Name"
                    type="text"
                    className="form-control  "
                    id="first_name"
                  />
                  <small className="text-danger error-form">
                    {
                      joiErrors.filter(
                        (err) => err.context.label === "first_name"
                      )[0]?.message
                    }
                  </small>
                </div>
                <div className="col-md-6 input-data">
                  <label htmlFor="last_name"></label>
                  <input
                    onClick={clear}
                    onChange={getUser}
                    placeholder="Last Name"
                    type="text"
                    className="form-control"
                    id="last_name"
                  />
                  <small className="text-danger error-form">
                    {
                      joiErrors.filter(
                        (err) => err.context.label === "last_name"
                      )[0]?.message
                    }
                  </small>
                </div>
              </div>
              <div className="px-4">
                <div className="input-data">
                  <label htmlFor="email"></label>
                  <input
                    onClick={clear}
                    onChange={getUser}
                    placeholder="Email Address"
                    type="email"
                    className="form-control  "
                    id="email"
                  />
                  <small className="text-danger error-form">
                    {
                      joiErrors.filter((err) => err.context.label === "email")[0]
                        ?.message
                    }
                  </small>
                </div>
                <div className="input-data">
                  <label htmlFor="age"></label>
                  <input
                    onClick={clear}
                    onChange={getUser}
                    placeholder="Age"
                    type="number"
                    className="form-control  "
                    id="age"
                  />
                  <small className="text-danger error-form">
                    {
                      joiErrors.filter((err) => err.context.label === "age")[0]
                        ?.message
                    }
                  </small>
                </div>
                <div className="input-data">
                  <label htmlFor="password"></label>
                  <input
                    onClick={clear}
                    onChange={getUser}
                    placeholder="Password"
                    type="password"
                    className="form-control  "
                    id="password"
                  />
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
                <button className="my-3 w-100 mx-auto">
                  {spiner ? (
                    <i className="fa fa-spin fa-spinner"></i>
                  ) : (
                    "Create Account"
                  )}
                </button>
                <p className='text-muted small'>This site is protected by reCAPTCHA and the Google <a className='text-muted text-decoration-underline' target={'_blank'} rel='noreferrer' href="https://policies.google.com/privacy">Privacy Policy</a>  and <a className='text-muted text-decoration-underline' target={'_blank'} rel='noreferrer' href="https://policies.google.com/terms">Terms of Service</a> apply.</p>
                <hr />
                <p>
                  Already a member? <Link to="/login" className="nav-item text-info"> Log In <i className="fas fa-chevron-right small"></i> </Link>{" "}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
