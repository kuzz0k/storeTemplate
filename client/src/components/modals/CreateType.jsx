import React, { useState } from "react";
import { createType } from "../../http/deviceApi";

const CreateType = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const handleAdd = () => {
    createType({name: inputValue}).then(data => setInputValue(""))
    handleCloseModal()
  };

  return (
    <div>
      {/* Кнопка для открытия модального окна */}
      <button onClick={handleOpenModal}>Добавить тип</button>

      {/* Модальное окно */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>Введите данные</h2>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ваш текст здесь"
              style={styles.input}
            />
            <div style={styles.buttons}>
              <button onClick={handleAdd} style={styles.addButton}>
                Добавить
              </button>
              <button onClick={handleCloseModal} style={styles.closeButton}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Стили для модального окна
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
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  closeButton: {
    padding: "10px 20px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default CreateType;
