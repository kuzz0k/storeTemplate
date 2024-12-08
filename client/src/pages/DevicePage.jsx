import React from 'react'
import star from '../assets/star.png'


const DevicePage = () => {
  const device = {id: 1, name: 'product1', rating: 5, price: 1000, img: ''}
  const description = []
  return (
    <div>
      <div className='Row'>
        <img src={device.img} alt="" />
        <div>
          <h2>{device.name}</h2>
        </div>
        <div
        style={{background: `url(${star}) no-repeat center center`, width:240, height: 240, backgroundSize: 'cover', fontSize:64}}
        >
          {device.rating}
        </div>
        <div>
          <h3>{device.price}</h3>
          <button>Добавить в корзину</button>
        </div>
      </div>
      <div className="description">
        <h2>Характеристики</h2>
        {description.map(info =>
          <div key={info.id}>
            {info.title}: {info.description}
          </div>
        )}
      </div>
    </div>
  )
}

export default DevicePage