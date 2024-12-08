import React, { useState } from "react";

const CreateBrand = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для управления модальным окном
  const [inputValue, setInputValue] = useState(""); // Состояние для хранения значения инпута


  const handleAdd = () => {
    console.log("Добавлено:", inputValue);
    setInputValue("");
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Кнопка для открытия модального окна */}
      <button onClick={() => setIsModalOpen(true)}>Добавить бренд</button>

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
              <button onClick={() => setIsModalOpen(false)} style={styles.closeButton}>
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

export default CreateBrand;
