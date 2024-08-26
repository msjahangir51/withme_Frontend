import Cookies  from 'js-cookie';
const apiUrl = "http://localhost:4000";
const token = Cookies.get("token")
export const AuthToken ={
    headers:{
      Authorization: token
    }
  }

 export default apiUrl