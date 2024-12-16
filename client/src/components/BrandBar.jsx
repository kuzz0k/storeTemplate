import React, { useContext } from 'react'
import { Context } from '../index'
import {observer} from 'mobx-react-lite'

const BrandBar = observer(() => {
  const {device} = useContext(Context)

  const handleClick = (brand) => {
    if (brand === device.selectedBrand) {
      device.setSelectedBrand({})
    } else {
      device.setSelectedBrand(brand)
    }
  }

  return (
    <div>
      {device.brands.map(brand => 
        <div 
        className="brand" 
        key={brand.id} 
        onClick={() => handleClick(brand)}
        >
          {brand.name}
        </div>
      )}
    </div>
  )
})

export default BrandBar