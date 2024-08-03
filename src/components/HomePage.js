/** @format */

import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
export const HomePage = ({ onDataReceived }) => {
  const { addName, addMonth } = useContext(GlobalContext);
  const [name, setName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  useEffect(() => {
    const currentMonthIndex = new Date().getMonth();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    setSelectedMonth(monthNames[currentMonthIndex]);
  }, []);
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  const handleClick = (e) => {
    e.preventDefault();
    const error = document.querySelector(".error");
    if (name === "") {
      const namrCheck = document.getElementById("accountname");
      namrCheck.style.border = "1px solid red";
      namrCheck.focus();
      error.style.display = "block";
      return;
    }
    error.style.display = "none";
    addName(name);
    addMonth(selectedMonth);
    onDataReceived(name, selectedMonth);
    const page = document.getElementById("home");
    page.style.left = "100%";
    setTimeout(() => {
      page.style.display = "none";
    }, 500);
  };
  return (
    <div className="home-page" id="home">
      <form className="home-form">
        <label htmlFor="accountname">Enter name </label>
        <input
          id="accountname"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <p className="error">please enter name</p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="month">Select Month </label>
          <select id="month" value={selectedMonth} onChange={handleMonthChange}>
            <option value="" disabled>
              Select a month
            </option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
      </form>
      <button onClick={(e) => handleClick(e)} className="go-to-tracker">
        Go to Tracker <i className="fa fa-arrow-right"></i>
      </button>
    </div>
  );
};
