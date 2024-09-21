import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

const Edit = () => {


    const users = {
        fname: "",
        lname: "",
        email: "",
    }

    const {id} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(users);

    const inputChangeHandler = (e) =>{
        const{name, value} = e.target;
            setUser({...user, [name]: value});
            console.log(user);
    }

    useEffect(()=>{
        axios.get(`https://crud-app-server-gjdw.onrender.com/api/getone/${id}`)
        .then((response)=>{
            setUser(response.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[id])

    const submitForm = async(e)=>{
        e.preventDefault();
        await axios.put(`https://crud-app-server-gjdw.onrender.com/api/update/${id}`, user)
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
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              value={user.fname}
              name="fname"
              id="fname"
              autoComplete='off'
              placeholder="Firt Name"
              className="form-control"
              onChange={inputChangeHandler}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              value={user.lname}
              name="lname"
              id="lname"
              autoComplete='off'
              placeholder="Last Name"
              className="form-control"
              onChange={inputChangeHandler}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={user.email}
              name="email"
              id="email"
              autoComplete='off'
              placeholder="Enter Email"
              className="form-control"
              onChange={inputChangeHandler}
            />
          </div>
          <button type='submit' className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Edit
