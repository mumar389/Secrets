import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';
// import {base_url} from '../url';

const Authenticate = (props) => {
    const [cookies]=useCookies();
    const navigate=useNavigate();
const setUser=async ()=>{
    const res=await fetch(`/api/v1/verify-user`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${cookies.jwt}`
        }
    });
    if(!(res.status===200)){
        console.log("Unauthorized Access");
        navigate('/sign-in')
        // window.open(`${base_url}/sign-in`,'_self')
    }
    else{
        const response=await res.json();
        // console.log(response);
        props.onLogin(response)
        // console.log("Authorization success");
    }

}
useEffect(()=>{
        setUser();
        // eslint-disable-next-line
    },[])
    return (
        <>
       
        {}

    </>
  )
}

export default Authenticate