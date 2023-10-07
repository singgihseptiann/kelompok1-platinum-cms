import React, { useState } from "react";
import axios from "axios";

const BurroComponent = () => {
  const handleButtonClick = async () => {
    try {
      const response = await axios.get(
        "https://api-car-rental.binaracademy.org/admin/order/reports?from=2022-01-01&until=2022-01-31",
        // "https://api-car-rental.binaracademy.org/admin/v2/order",
        {
          headers: {
            access_token: `${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Data from API:", response.data);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };
  const token = localStorage.getItem("token");
  console.log("Token:", token);

  return (
    <div>
      <button onClick={handleButtonClick}>Get Data</button>
    </div>
  );
};

export default BurroComponent;
