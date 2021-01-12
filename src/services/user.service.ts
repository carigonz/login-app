import IClientUser from '../interfaces/IclientUser'

const API_URL = "http://localhost:5000/api/v0";

const getUser = async ( token: string ): Promise<IClientUser> => {

  const res: any = await fetch(`${API_URL}/users/me`, {
    method: 'POST', 
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ token })
  });
  const response: { user: IClientUser } = await res.json();
  if (response.user) {
    setCurrentUser(response.user)
  }

  return response.user;
};

const setCurrentUser = ( user: IClientUser ) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const getCurrentUser = (): Promise<IClientUser | null> => {
  const user: string | null = localStorage.getItem("user");
  console.log(user);
  
  return user ? JSON.parse(user) : null;
};

const logout = () => localStorage.removeItem('user');

export default { getUser, setCurrentUser, getCurrentUser, logout };