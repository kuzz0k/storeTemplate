import React, { useContext } from 'react'
import { Context } from '../index'
import {observer} from 'mobx-react-lite'

const TypeBar = observer(() => {
  const {device} = useContext(Context)
  return (
    <div>
      {device.types.map(type => 
        <div 
        className="type" 
        key={type.id} 
        onClick={device.setSelectedType(type)}
        >
          {type.name}
        </div>
      )}
    </div>
  )
})

export default TypeBar