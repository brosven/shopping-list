import React, { useState } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
  faDumpster,
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [items, setItems] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const [totalValue, setTotalValue] = useState(0);
  const [inputPlaceholderValue, setInputPlaceholderValue] =
    useState("Add an item...");

  const handleButtonClick = () => {
    const newItem = {
      itemName: inputValue,
      quantity: 1,
      isSelected: false,
    };

    const newItems = [...items, newItem];

    setItems(newItems);
    calculateTotal(newItems);
    setInputValue("");
    setInputPlaceholderValue("Add an item...");
  };

  const handleQuantityIncrease = (index) => {
    const newItems = [...items];

    newItems[index].quantity++;
    setItems(newItems);
    calculateTotal(newItems);
  };

  const handleQuantityDecrease = (index) => {
    const newItems = [...items];

    newItems[index].quantity--;

    if (newItems[index].quantity < 0) {
      newItems[index].quantity = 0;
    }

    setItems(newItems);
    calculateTotal(newItems);
  };

  const toggleComplete = (index) => {
    const newItems = [...items];

    newItems[index].isSelected = !newItems[index].isSelected;
    setItems(newItems);
  };

  const calculateTotal = (items) => {
    const totalItemCount = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    setTotalValue(totalItemCount);
  };

  const handleDeleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    calculateTotal(newItems);
  };

  return (
    <div className="app-background">
      <div className="main-container">
        <div className="add-item-box">
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter" && inputValue === "") {
                setInputPlaceholderValue("There must be smth...");
              } else if (event.key === "Enter") {
                handleButtonClick();
              }
            }}
            className="add-item-input"
            placeholder={inputPlaceholderValue}
          />
          <FontAwesomeIcon
            icon={faPlus}
            onClick={() => {
              if (inputValue === "") {
                setInputPlaceholderValue("There must be smth...");
              } else {
                handleButtonClick();
              }
            }}
          />
        </div>
        <div className="item-list">
          {items.map((item, index) => (
            <div className="item-container" key={index}>
              <div
                className="item-name"
                onClick={() => {
                  toggleComplete(index);
                }}
              >
                {item.isSelected ? (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span className="completed">{item.itemName}</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCircle} />
                    <span>{item.itemName}</span>
                  </>
                )}
              </div>
              <div className="item-state-buttons-wrapper">
                <div className="quantity">
                  <button>
                    <FontAwesomeIcon
                      icon={faChevronLeft}
                      onClick={() => {
                        handleQuantityDecrease(index);
                      }}
                    />
                  </button>
                  <span> {item.quantity} </span>
                  <button>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      onClick={() => {
                        handleQuantityIncrease(index);
                      }}
                    />
                  </button>
                </div>
                <button
                  className="delete-item"
                  onClick={() => {
                    handleDeleteItem(index);
                  }}
                >
                  <FontAwesomeIcon icon={faDumpster} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="total">Total: {totalValue}</div>
      </div>
    </div>
  );
};

export default App;
