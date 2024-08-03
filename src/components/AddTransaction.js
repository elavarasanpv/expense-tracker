/** @format */

import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { toast } from "react-toastify";
export const AddTransaction = () => {
  const context = useContext(GlobalContext);
  const { addTransaction, deleteTransaction } = useContext(GlobalContext);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  const [text1, setText1] = useState("");
  const [amount1, setAmount1] = useState(0);
  const addtrans = (e, type) => {
    e.preventDefault();
    let firstCheck = text === "" || amount === 0;
    let secondCheck = text1 === "" || amount1 === 0;
    if (firstCheck && secondCheck) {
      toast.error("Please enter text and amount !", {
        position: "top-center",
      });
      return;
    }
    // if ((text === "" && amount === 0) || (text1 === "" && amount1 === 0)) {
    //   alert("Please add text and amount");
    //   return;
    // }
    console.log(isExpense, "isExpense");
    let newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
      duration: +selectedOption,
    };
    if (type === "expense") {
      newTransaction = {
        id: Math.floor(Math.random() * 100000000),
        text: text1,
        amount: +amount1,
        duration: +selectedOption1,
      };
    }
    if (type === "mobile" && isExpense && amount > 0) {
      newTransaction.amount = -newTransaction.amount;
    }
    if (type === "expense" && amount1 > 0) {
      newTransaction.amount = -newTransaction.amount;
    }
    console.log(newTransaction, "newTransaction");
    addTransaction(newTransaction);
    if (type === "expense") {
      setText1("");
      setAmount1(0);
    } else {
      setText("");
      setAmount(0);
    }
  };

  const [selectedOption, setSelectedOption] = useState(1);
  const [selectedOption1, setSelectedOption1] = useState(1);
  const options = [
    { label: "Daily", value: 30 },
    { label: "Weekly", value: 4 },
    { label: "Monthly", value: 1 },
  ];

  const handleOptionChange = (event) => {
    setSelectedOption(+event.target.value);
  };
  const handleOptionChange1 = (event) => {
    setSelectedOption1(+event.target.value);
  };
  const [isExpense, setIsExpense] = useState(false);
  const handleDataFromToggle = () => {
    setIsExpense((prevState) => !prevState);
  };

  return (
    <>
      <div className="web-only">
        <h4 className="text-title" style={{ color: "#c0392b" }}>
          Expense
        </h4>
        <table border="1">
          <thead>
            <tr>
              <th className="text-column-first">ID</th>
              <th className="text-column">TEXT</th>
              <th className="text-column">DURATION</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {context.transactions
              .filter((item) => item.amount < 0)
              .map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.text}</td>
                  <td>
                    {options.find((o) => o.value === item.duration).label}
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {item.amount}{" "}
                      <button
                        className="delete-btn-inner"
                        onClick={() => deleteTransaction(item.id)}
                      >
                        x
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <form style={{ position: "relative" }} className="exclude-from-pdf">
          <div className="form-container">
            <input
              placeholder="Enter expense..."
              className="input-container sample-container"
              type="text"
              value={text1}
              onChange={(e) => setText1(e.target.value)}
            ></input>
            <div className="radio-group">
              {options.map((option) => (
                <label key={option.value} className="radio-container">
                  <input
                    type="radio"
                    value={option.value}
                    checked={selectedOption1 === option.value}
                    onChange={handleOptionChange1}
                  />
                  {option.label}
                </label>
              ))}
            </div>
            <input
              placeholder="Enter Amount..."
              className="input-container"
              type="number"
              value={amount1}
              onChange={(e) => setAmount1(e.target.value)}
            ></input>
          </div>
          <button className="small-btn" onClick={(e) => addtrans(e, "expense")}>
            Add Expense
          </button>
        </form>
        <h4 style={{ marginTop: "50px" }} className="text-title">
          Incomes
        </h4>
        <table border="1">
          <thead>
            <tr>
              <th className="text-column-first">ID</th>
              <th className="text-column">TEXT</th>
              <th className="text-column">DURATION</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {context.transactions
              .filter((item) => item.amount >= 0)
              .map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.text}</td>
                  <td>
                    {options.find((o) => o.value === item.duration).label}
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {item.amount}{" "}
                      <button
                        className="delete-btn-inner"
                        onClick={() => deleteTransaction(item.id)}
                      >
                        x
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <form style={{ position: "relative" }} className="exclude-from-pdf">
          <div className="form-container">
            <input
              placeholder="Enter incomes..."
              className="input-container sample-container"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></input>
            <div className="radio-group">
              {options.map((option) => (
                <label key={option.value} className="radio-container">
                  <input
                    type="radio"
                    value={option.value}
                    checked={selectedOption === option.value}
                    onChange={handleOptionChange}
                  />
                  {option.label}
                </label>
              ))}
            </div>
            <input
              placeholder="Enter Amount..."
              className="input-container"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            ></input>
          </div>
          <button className="small-btn" onClick={(e) => addtrans(e, "incon")}>
            Add Incomes
          </button>
        </form>
      </div>

      <div className="mobile-only exclude-from-pdf">
        <h3>Add new transaction</h3>
        <form>
          <div className="form-control">
            <label htmlFor="text">Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text..."
            />
          </div>
          <label style={{ marginBottom: "0px" }}>Duration</label>
          <div className="radio-group">
            {options.map((option) => (
              <label key={option.value} className="radio-container">
                <input
                  type="radio"
                  value={option.value}
                  checked={selectedOption1 === option.value}
                  onChange={handleOptionChange1}
                />
                {option.label}
              </label>
            ))}
          </div>
          <div className="form-control">
            <label htmlFor="type" style={{ marginTop: "8px" }}>
              Transaction Mode
            </label>
            <div className="radio-switch">
              Income
              <div onClick={handleDataFromToggle} className="ToggleSwitch">
                <div className={isExpense ? "knob active" : "knob"} />
              </div>
              Expense
            </div>
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
            />
          </div>
          <button className="btn" onClick={(e) => addtrans(e, "mobile")}>
            Add transaction
          </button>
        </form>
      </div>
    </>
  );
};
