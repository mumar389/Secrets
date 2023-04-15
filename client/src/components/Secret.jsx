import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { NavLink} from 'react-router-dom';
import Fetched from './Fetched';
// import {base_url} from '../url';
const Secret = (props) => {
  const {user}=props
  const [cookies]=useCookies();
  // const [user,setUser]=useState({
  //   name:'',
  //   email:"",
  //   id:''
  // });
  // "proxy": "https://secrets-weld.vercel.app",

//  async function AuthUser(data){
//   setUser({
//     name:data.name,
//     email:data.email,
//     id:data._id
//   })
//   // console.log("Parent",data);
//   }
  const [secrets,setSecret]=useState([]);
  const getSecret=async (e)=>{
    const res=await fetch(`/api/v1/secret/get-secret`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${cookies.jwt}`
    }
    });
    if(!(res.status===200)){
      console.log("Unable to fetch secrets");
    }
    else{
      const response=await res.json();
      setSecret((prev)=>{
        return[
          ...prev,
          response.data
        ]
        
      })
    }
  }


  useEffect(()=>{
    getSecret()
    // eslint-disable-next-line
  },[])
  return (
    <>
    <div className="jumbotron text-center">
    <div className="container">
    <i className="fas fa-key fa-6x"></i>
    <h1>Welcome {user.name}</h1>
    <hr/>
    <h2>All Secrets-:</h2>
    <div className='d-flex flex-row mb-3'>
    <div className='row '>

       
    {secrets===null?"No secret available":
  secrets.map((s)=>{
   return s.map((u)=>{
    return <Fetched key={u._id} uid={u._id} title={u.title} content={u.content} name={u.user.name} currentId={user.id} createId={u.user._id}/>

    })
  })
}
    </div>
    </div>
 
    <NavLink className="mt-2 btn btn-dark btn-lg" to="/secret-form" role="button">Create a Secret</NavLink>
    <br/>
  </div>
</div>
</>
  )
}

export default Secret