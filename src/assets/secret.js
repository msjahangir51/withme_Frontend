import Cookies  from 'js-cookie';
const apiUrl = "https://withme-backend.onrender.com";
const token = Cookies.get("token")
export const AuthToken ={
    headers:{
      Authorization: token
    }
  }

 export default apiUrl