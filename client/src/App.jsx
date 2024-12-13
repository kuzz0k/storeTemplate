import React, { useContext, useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import {observer} from 'mobx-react-lite'
import { Context } from './index'
import { check } from './http/userApi'
import Loading from './components/Loading/Loading'


const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check()
      .then(data => {
        user.setIsAuth(true);
        user.setUser(true);
      })
      .catch(e => {
        console.log(e)
      })
      .finally(() => setLoading(false))
  }, [])
  
  if(loading) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  )
})

export default App