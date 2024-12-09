import React, { useContext, useState } from "react";
import { Context } from '../../index'


const CreateDevice = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [info, setInfo] = useState([])

  const {device} = useContext(Context)

  const addInfo = () => {
    setInfo([...info, {title: '', decription: '', number: Date.now()}])
  }

  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number!==number))
  }

  const handleAdd = () => {
    console.log("Добавлено:");
    setIsModalOpen(false);
  };

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
              <select>
                {device.types.map(type => 
                  <option key={type.id} value={type.id}>{type.name}</option>
                )}
              </select>
            </div>
            <div>
              <h3>Выберите бренд</h3>
              <select>
                {device.brands.map(brand => 
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                )}
              </select>
            </div>
            <div>
              <input type="text" placeholder="Введите название товара"/>
              <input type="number" placeholder="Введите стоимость товара"/>
              <input type="file"/>
            </div>
            <div>
              <button onClick={addInfo}>Добавить новое свойство</button>
              {info.map(i => 
                <div key={i.number}>
                  <input type="text" placeholder="Введите название свойства"/>
                  <input type="text" placeholder="Введите описание свойства"/>
                  <button onClick={() => removeInfo(i.number)}>Удалить</button>
                </div>
              )}
            </div>

            <div>
              <button onClick={handleAdd}>
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
};


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