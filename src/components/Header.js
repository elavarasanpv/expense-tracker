/** @format */

import React from "react";
import org from "../assets/org.png";
export const Header = () => {
  return (
    <div className="header">
      Expense Tracker <img src={org} alt="org" style={{ width: "75px" }} />
    </div>
  );
};
