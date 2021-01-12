import IClientUser from '../interfaces/IclientUser';
import UserService from './user.service';

const API_URL = "http://localhost:5000/api/v0";

const login = async ( email: string , password: string ) => {

    const res: any = await fetch(`${API_URL}/authenticate`, {
      method: 'POST', 
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    return await res;
};

const getCurrentUserToken = () => {
  return localStorage.getItem("token");
};

export default { login, getCurrentUserToken };