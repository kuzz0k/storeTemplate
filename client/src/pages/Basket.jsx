import {useEffect, useContext} from 'react'
import { removeFromCart, showCart } from '../http/basketApi'
import { Context } from '../index'
import DeviceItem from '../components/DeviceItem'
import {observer} from 'mobx-react-lite'


const Basket = observer(() => {
  const {basket} = useContext(Context)

  useEffect(() => {
    showCart().then(data => basket.setDevices(data))
  }, [])

  const removeFromBasket = (deviceId) => {
    removeFromCart(deviceId)
    let basketDevices = basket.devices
    basketDevices = basketDevices.filter(device => device.id !== deviceId)
    basket.setDevices(basketDevices)
    console.log(deviceId)
  }
  
  return (
    <div>
      <h2>Basket</h2>
      <div>
        {basket.devices.map(device => (
          <div key={device.id}>
            <DeviceItem device={device}/>
            <p>quantity: {device.quantity}</p>
            <button onClick={() => removeFromBasket(device.id)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  )
})

export default Basket