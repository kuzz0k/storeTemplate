import React, { useContext } from 'react'
import { Context } from '../index'
import {observer} from 'mobx-react-lite'

const TypeBar = observer(() => {
  const {device} = useContext(Context)

  const handleClick = (type) => {
    if (type === device.selectedType) {
      device.setSelectedType({})
    } else {
      device.setSelectedType(type)
    }
  }

  return (
    <div>
      {device.types.map(type => 
        <div 
        className="type" 
        key={type.id} 
        onClick={() => handleClick(type)}
        >
          {type.name}
        </div>
      )}
    </div>
  )
})

export default TypeBar