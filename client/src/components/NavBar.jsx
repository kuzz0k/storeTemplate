import React, { useContext } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import {useNavigate} from 'react-router-dom'
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
 
const NavBar = observer(() => {
  const history = useNavigate()
  const {user} = useContext(Context)

  const logout = () => {
    history(SHOP_ROUTE)
    localStorage.removeItem('token')
    user.setIsAuth(false)
    user.setUser({})
  }
  return (
    <nav>
      <button onClick={() => history(SHOP_ROUTE)}>Главная</button>
      {user.isAuth ?
        <div>
          <button onClick={() => history(ADMIN_ROUTE)}>Админ панель</button>
          <button onClick={logout}>Выйти</button>
          <button onClick={() => history(BASKET_ROUTE)}>Корзина</button>
        </div>
      :
        <div>
          <button onClick={() => history(LOGIN_ROUTE)}>Авторизоваться</button>
        </div>
      }
    </nav>
  )
})

export default NavBar