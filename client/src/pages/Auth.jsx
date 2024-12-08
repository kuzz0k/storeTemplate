import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts"
import { NavLink, useLocation } from "react-router-dom"

const Auth = () => {
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE

  return (
    <div className="container">
      <h2>{isLogin?'Авторизация':'Регистрация'}</h2>
      <form action="">
        <input type="text" placeholder='Введите ваш email'/>
        <input type="password" placeholder='Введите ваш пароль'/>
        {isLogin?
        <NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink>
        :
        <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
        }
        <button>{isLogin?'Войти':'Зарегистрироваться'}</button>
      </form>
    </div>
  )
}

export default Auth