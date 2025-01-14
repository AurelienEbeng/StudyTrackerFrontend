import { useEffect } from "react"
import { useJwt } from "../context/Jwt.context"
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const jwt = useJwt();
    const navigate = useNavigate()
    useEffect(()=>{
        jwt.logout()
        navigate("/login",{replace:true})
    },[])
  return (
    <div>Logout</div>
  )
}

export default Logout