import React, { useState, useEffect } from 'react';
import axios from "axios";
import toast from "react-hot-toast"
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.


const User = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      const response = await axios.get("https://crud-app-server-gjdw.onrender.com/api/getall")
      setUsers(response.data);
    }

    fetchData();

  }, [])

  const deleteUser = async(userId) =>{
    await axios.delete(`https://crud-app-server-gjdw.onrender.com/api/delete/${userId}`)
    .then((responses)=>{
      setUsers((prevUser)=> prevUser.filter((user)=> user._id !== userId))
      toast.success(responses.data.msg, {position: 'top-right'})
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className='w-50 bg-white rounded p-3'>
        <Link to="/add" className='btn btn-success'>Add +</Link>
        <table className='table'>
          <thead className='text-center'>
            <tr>
              <th>Sr.No.</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className='text-center'>
            {
              users.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.fname} {user.lname}</td>
                    <td>{user.email}</td>
                    <td>
                      <Link to={`/edit/`+user._id} className='btn btn-success mx-2'>Update</Link>
                      <button onClick={()=> deleteUser(user._id)} className='btn btn-success mx-2'>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default User
