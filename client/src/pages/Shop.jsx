import { useContext, useEffect } from 'react'
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import {observer} from 'mobx-react-lite'
import { Context } from '../index'
import { fetchTypes, fetchBrands, fetchDevices } from '../http/deviceApi'
import Pagination from '../components/Pagination'


const Shop = observer(() => {
  const {device} = useContext(Context)

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
    fetchDevices(null, null, 1, 1).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [])

  useEffect(() => {
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 5).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [device.page, device.selectedType, device.selectedBrand])
  
  

  return (
    <div>
      <TypeBar />
      <BrandBar />
      <DeviceList />
      <Pagination />
    </div>
  )
})

export default Shop