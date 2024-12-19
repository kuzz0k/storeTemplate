import {useEffect, useContext} from 'react'
import { showCart } from '../http/basketApi'
import { Context } from '../index'
import DeviceItem from '../components/DeviceItem'
import {observer} from 'mobx-react-lite'


const Basket = observer(() => {
  const {basket} = useContext(Context)

  useEffect(() => {
    showCart().then(data => basket.setDevices(data))
  }, [])
  
  return (
    <div>
      <h2>Basket</h2>
      <div>
        {basket.devices.map(device => (
          <div key={device.id}>
            <DeviceItem device={device}/>
            <p>quantity: {device.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  )
})

export default Basket