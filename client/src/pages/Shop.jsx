import { useContext, useEffect } from 'react'
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import {observer} from 'mobx-react-lite'
import { Context } from '../index'
import { fetchTypes, fetchBrands, fetchDevices } from '../http/deviceApi'


const Shop = observer(() => {
  const {device} = useContext(Context)

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
    fetchDevices().then(data => device.setDevices(data.rows))
  }, [])
  

  return (
    <div>
      <TypeBar />
      <BrandBar />
      <DeviceList />
    </div>
  )
})

export default Shop