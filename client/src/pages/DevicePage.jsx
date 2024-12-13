import {useState, useEffect} from 'react'
import star from '../assets/star.png'
import { useParams } from 'react-router-dom'
import { fetchDevice } from '../http/deviceApi'


const DevicePage = () => {
  const [device, setDevice] = useState({info: []})
  const {id} = useParams()

  useEffect(() => {
    fetchDevice(id).then(data => setDevice(data))
  }, [])
  


  const description = []
  return (
    <div>
      <div className='Row'>
        <img src={process.env.REACT_APP_API_URL + device.img} alt="" />
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
        {device.info.map(info =>
          <div key={info.id}>
            {info.title}: {info.description}
          </div>
        )}
      </div>
    </div>
  )
}

export default DevicePage