import React from 'react'
import star from '../assets/star.png'
import {useNavigate} from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts'

const DeviceItem = ({device}) => {
  const history = useNavigate()
  return (
    <div onClick={() => history(DEVICE_ROUTE + '/' + device.id)}>
      <img src={device.img} alt="" />
      <div>Nike</div>
      <div>
        <div>{device.rating}</div>
        <img src={star} alt="" />
      </div>
      <div>{device.name}</div>
    </div>
  )
}

export default DeviceItem