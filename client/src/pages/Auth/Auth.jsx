import { useContext, useState } from "react"
import { login, registration } from "../../http/userApi"
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../../utils/consts"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import {observer} from 'mobx-react-lite'
import { Context } from "../../index"
import styles from './Auth.module.scss'



const Auth = observer(() => {
  const {user} = useContext(Context)
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const history = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const click = async (event) => {
    event.preventDefault()
    try {
      let data
      if (isLogin) {
        data = await login(email, password)
      } else {
        data = await registration(email, password)
      }
      user.setUser(user)
      user.setIsAuth(true)
      history(SHOP_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <div className={styles.container}>
      <h2>{isLogin?'Авторизация':'Регистрация'}</h2>
      <form onSubmit={click}>
        <input type="text" placeholder='Введите ваш email' value={email} onChange={e => setEmail(e.target.value)}/>
        <input type="password" placeholder='Введите ваш пароль' value={password} onChange={e => setPassword(e.target.value)}/>
        {isLogin?
        <NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink>
        :
        <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
        }
        <button type="submit">{isLogin?'Войти':'Зарегистрироваться'}</button>
      </form>
    </div>
  )
})

export default Auth