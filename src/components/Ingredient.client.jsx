"use client";

import React, { useState, useEffect } from "react";
import ingredientData from "../../ingredientconfig.json";
import leftArrow from "../assets/leftArrow.svg";
import "../styles/ingredients.css";

const Ingredient = () => {
  const [ingredient, setIngredient] = useState("");
  const [showGoBack, setShowGoBack] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const parsedURL = new URL(window.location.href);
    const pathName = parsedURL.pathname;
    const urlParts = pathName.split("/");
    const ingredientName = urlParts[urlParts.length - 1];

    setIngredient(ingredientName.replace("-", " "));

    const timeout = setTimeout(() => setShowGoBack(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleClick = () => window.history.back();

  const matchedItem = ingredientData.find(
    (item) => ingredient.toLowerCase() === item.name,
  );

  return (
    <div id="ingredient-container">
      <div className="single-ingredient-container">
        <h1>{ingredient.toUpperCase()}</h1>
        {matchedItem && <h2>{matchedItem.description}</h2>}
      </div>
      <div
        className="go-back-container"
        onClick={handleClick}
        style={{ opacity: showGoBack ? 1 : 0, transition: "opacity 0.5s" }}
      >
        <div className="go-back-button">
          <img src={leftArrow} alt="Back arrow" />
          <p>Back</p>
        </div>
      </div>
    </div>
  );
};

export default Ingredient;
