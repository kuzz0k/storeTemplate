import React, { useContext } from 'react'
import { Context } from '../index'
import {observer} from 'mobx-react-lite'

const BrandBar = observer(() => {
  const {device} = useContext(Context)

  return (
    <div>
      {device.brands.map(brand => 
        <div 
        className="brand" 
        key={brand.id} 
        onClick={device.setSelectedBrand(brand)}
        >
          {brand.name}
        </div>
      )}
    </div>
  )
})

export default BrandBar