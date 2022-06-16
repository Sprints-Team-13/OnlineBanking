import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router';
import {getLocalStorage, setLocalStorage} from '../helpers/localStorage';
import popAlert from '../helpers/popAlert';

export const AuthContext = createContext({
  isAdmin: '', 
  userName: '',
  userEmail: '',
  jwt: '',
  userPhone: '',
  signIn: (auth)=>{},
  signOut: ()=>{}
});

export function AuthProvider({children}) {

  const navigate = useNavigate()
  
  const [auth, setAuth] = useState(getLocalStorage('auth',{}))
  // console.log(auth);
  
  const {token} = auth
  const {role, fullName, email, phone} = auth.user ? auth.user : ''

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
    setTimeout(()=> window.location.reload(), 1200)
  }

  return (
    <AuthContext.Provider value={{
      isAdmin: role, 
      userName: fullName,
      userEmail: email,
      jwt: token,
      userPhone: phone,
      signIn: signIn,
      signOut: signOut
    }}>
      <>{children}</>
    </AuthContext.Provider>
  );
}