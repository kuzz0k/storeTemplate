import React, { useContext } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
 
const NavBar = observer(() => {
  const {user} = useContext(Context)
  return (
    <nav>
      <button>Главная</button>
      {user.isAuth ?
        <div>
          <button>Войти</button>
          <button>Админ пакель</button>
        </div>
      :
        <div>
          <button onClick={() => user.setIsAuth(true)}>Авторизоваться</button>
        </div>
      }
    </nav>
  )
})

export default NavBar