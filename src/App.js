/** @format */
import React, { useState } from "react";
import "./App.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Header } from "./components/Header";
import { Balance } from "./components/Balance";
import { IncomeExpenses } from "./components/IncomeExpenses";
import { AddTransaction } from "./components/AddTransaction";
import { TransactionList } from "./components/TransactionList";
import { GlobalProvider } from "./context/GlobalState";
import { WaterMark } from "./components/WaterMark";
import { HomePage } from "./components/HomePage";
import { ToastContainer } from "react-toastify";

function App() {
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const handleDataFromChild = (data, type) => {
    setName(data.toLowerCase());
    setMonth(type.toLowerCase());
  };
  const hideElements = () => {
    // Add the class to elements you want to hide
    document.querySelectorAll(".exclude-from-pdf").forEach((el) => {
      el.classList.add("hide-in-pdf");
    });
  };

  const showElements = () => {
    // Remove the class from elements to show them again
    document.querySelectorAll(".exclude-from-pdf").forEach((el) => {
      el.classList.remove("hide-in-pdf");
    });
  };
  const generatePDF = () => {
    hideElements();
    const input = document.getElementById("content");
    const input1 = document.getElementById("view");
    const input2 = document.getElementById("list");
    const watermark = document.getElementById("water1");
    watermark.style.display = "block";
    input1.style.height = "100%";
    input2.style.height = "100%"; // Ensure the full height is set before capturing
    const originalHeight = input1.scrollHeight;
    console.log(input1.clientWidth);
    html2canvas(input, {
      height: originalHeight, // Set the full height
      windowHeight: originalHeight,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.5);
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${name}_${month}_expense.pdf`);
        showElements();
        input1.style.height = "calc(100% - 100px)";
        input2.style.height = "fit-content";
        watermark.style.display = "none"; // Specify the name of the PDF
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        showElements();
        input1.style.height = "calc(100% - 100px)";
        input2.style.height = "fit-content";
        watermark.style.display = "none";
      });
  };
  return (
    <GlobalProvider>
      <div style={{ height: "100%" }} id="content">
        <Header />
        <div style={{ overflow: "scroll" }} className="app-container" id="view">
          <HomePage onDataReceived={handleDataFromChild} />
          <div className="watermark-container" id="water1"></div>
          <div className="container">
            <Balance />
            <IncomeExpenses />
            <TransactionList />
            <AddTransaction />
          </div>
        </div>
        <WaterMark />
        <button
          onClick={generatePDF}
          className="exclude-from-pdf download-button"
        >
          <i className="fa fa-download"></i>
          Download as PDF
        </button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </GlobalProvider>
  );
}

export default App;
