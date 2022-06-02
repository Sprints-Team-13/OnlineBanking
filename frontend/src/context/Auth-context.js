import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router';
import {getLocalStorage, setLocalStorage} from '../helpers/localStorage';
import popAlert from '../helpers/popAlert';

export const AuthContext = createContext({
  isAdmin: false, 
  userName: '',
  userEmail: '',
  jwt: '',
  userId: '',
  signIn: (auth)=>{},
  signOut: ()=>{}
});

export function AuthProvider({children}) {

  const navigate = useNavigate()
  
  const [auth, setAuth] = useState(getLocalStorage('auth',{}))
  
  const {isAdmin, name, email, token, _id} = auth

  function signIn(auth) {
    setAuth(auth)
    setLocalStorage('auth', auth)
  }

  function signOut() {    
    localStorage.removeItem('jwt')
    localStorage.removeItem('auth')
    setAuth({})
    popAlert(`See you soon`)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{
      isAdmin, 
      userName: name,
      userEmail: email,
      jwt: token,
      userId: _id,
      signIn: signIn,
      signOut: signOut
    }}>
      <>{children}</>
    </AuthContext.Provider>
  );
}