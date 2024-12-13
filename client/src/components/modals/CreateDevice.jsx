import { useContext, useState, useEffect } from "react";
import { Context } from '../../index'
import { fetchTypes, fetchBrands, createDevice } from '../../http/deviceApi'
import {observer} from 'mobx-react-lite'


const CreateDevice = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [info, setInfo] = useState([])

  const [selectedBrand, setSelectedBrand] = useState(1)
  const [selectedType, setSelectedType] = useState(1)

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)

  const {device} = useContext(Context)

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
  }, [isModalOpen])
  
  useEffect(() => {
    console.log(selectedBrand, selectedType)
  }, [selectedType, selectedBrand])
  
  
  const addInfo = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
  }

  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }

  const selectFile = e => {
    setFile(e.target.files[0])
  }

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
  }

  const addDevice = () => {

    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', selectedBrand)
    formData.append('typeId', selectedType)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then(data => setIsModalOpen(false))
  }

  return (
    <div>
      {/* Кнопка для открытия модального окна */}
      <button onClick={() => setIsModalOpen(true)}>Добавить товар</button>

      {/* Модальное окно */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>Введите данные</h2>
            <div>
              <h3>Выберите тип</h3>
              <select onChange={e => setSelectedType(parseInt(e.target.value))}>
                {device.types.map(type => 
                  <option key={type.id} value={type.id}>{type.name}</option>
                )}
              </select>
            </div>
            <div>
              <h3>Выберите бренд</h3>
              <select onChange={(e => setSelectedBrand(parseInt(e.target.value)))}>
                {device.brands.map(brand => 
                  <option 
                    key={brand.id} 
                    value={brand.id}
                  >
                    {brand.name}
                  </option>
                )}
              </select>
            </div>
            <div>
              <input 
                value={name} 
                type="text" 
                placeholder="Введите название товара" 
                onChange={e => setName(e.target.value)}
              />
              <input 
                value={price} 
                type="number" 
                placeholder="Введите стоимость товара" 
                onChange={e => setPrice(e.target.value)}
              />
              <input 
                type="file" 
                onChange={selectFile}
              />
            </div>
            <div>
              <button onClick={addInfo}>Добавить новое свойство</button>
              {info.map(i => 
                <div key={i.number}>
                  <input 
                    value={i.title} 
                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                    type="text" 
                    placeholder="Введите название свойства"
                  />
                  <input 
                    value={i.description} 
                    onChange={(e) => changeInfo('description', e.target.value, i.number)} 
                    type="text" 
                    placeholder="Введите описание свойства"
                  />
                  <button onClick={() => removeInfo(i.number)}>Удалить</button>
                </div>
              )}
            </div>

            <div>
              <button onClick={addDevice}>
                Добавить
              </button>
              <button onClick={() => setIsModalOpen(false)} >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});


export default CreateDevice;


const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
}}