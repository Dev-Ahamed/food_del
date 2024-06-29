import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const FoodDisplay = ({ category }) => {
  const serverURL = "http://localhost:4000";

  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={`${serverURL}/images/${item.image}`}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
