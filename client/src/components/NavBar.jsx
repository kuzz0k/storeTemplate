import React, { useContext } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import {useNavigate} from 'react-router-dom'
import { ADMIN_ROUTE, LOGIN_ROUTE } from '../utils/consts'
 
const NavBar = observer(() => {
  const history = useNavigate()
  const {user} = useContext(Context)
  return (
    <nav>
      <button>Главная</button>
      {user.isAuth ?
        <div>
          <button onClick={() => history(ADMIN_ROUTE)}>Админ панель</button>
          <button onClick={() => history(LOGIN_ROUTE)}>Выйти</button>
        </div>
      :
        <div>
          <button onClick={() => user.setIsAuth}>Авторизоваться</button>
        </div>
      }
    </nav>
  )
})

export default NavBar