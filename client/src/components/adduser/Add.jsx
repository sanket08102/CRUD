import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

const Add = () => {

    const users = {
        fname:"",
        lname:"",
        email:"",
        password:""
    }
    const[user, setUser] = useState(users);
    const navigate = useNavigate();

    const inputHandler = (e) =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value});
    }

    const submitForm = async(e) =>{
        e.preventDefault();
        await axios.post("http://localhost:8000/api/create", user)
        .then((response)=>{
            toast.success(response.data.msg, {position:"top-right"})
            navigate("/")
        })
        .catch(error => console.log(error))
    }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to={"/"} className='btn btn-success'>Back</Link>
        <form onSubmit={submitForm}>
          <h2>Add User</h2>
          <div className="mb-2">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              name="fname"
              id="fname"
              autoComplete='off'
              placeholder="Firt Name"
              className="form-control"
              onChange={inputHandler}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              name="lname"
              id="lname"
              autoComplete='off'
              placeholder="Last Name"
              className="form-control"
              onChange={inputHandler}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete='off'
              placeholder="Enter Email"
              className="form-control"
              onChange={inputHandler}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete='off'
              placeholder="Password"
              className="form-control"
              onChange={inputHandler}
            />
          </div>
          <button type='submit' className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Add