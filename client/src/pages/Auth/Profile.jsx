import { useEffect } from "react"
import useAuth from "../../hooks/useAuth"
import { useAuthContext } from "../../context/AuthContext"

const Profile = () => {

  const {user} = useAuthContext()
  const {getUserProfile} = useAuth

  useEffect(()=>{
    const fetchProfile = async () => {
      try{
        const response = await getUserProfile
      }
      catch(error){

      }
    }
    fetchProfile()
  },[])
  return (
    <div>
      <h>User : {user.name}</h>
    </div>
  )
}
export default Profile