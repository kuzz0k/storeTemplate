import React from 'react'
import {useNavigate} from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts'

const DeviceItem = ({device}) => {
  const history = useNavigate()
  return (
    <div onClick={() => history(DEVICE_ROUTE + '/' + device.id)}>
      <img src={process.env.REACT_APP_API_URL + device.img} alt="" />
      <div>{device.name}</div>
    </div>
  )
}

export default DeviceItem