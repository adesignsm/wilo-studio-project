import React, { useState, useEffect } from "react";
import $ from "jquery";
import ingredientData from "../../ingredientconfig.json";

import leftArrow from "../assets/leftArrow.svg";
import "../styles/ingredients.css";

const Ingredient = () => {
    const [ingredient, setIngredient] = useState("");

    useEffect(() => {
        const url = window.location.href;
        const parsedRL = new URL(url);
        const pathName = parsedRL.pathname;

        const urlParts = pathName.split("/");
        const ingredientName = urlParts[urlParts.length - 1];
        
        setIngredient(ingredientName.replace("-", " "));

        setTimeout(() => {
            $(".go-back-container").animate({opacity: "1"}, 500);
        }, 1000);
    }, []);

    const handleClick = () => {window.history.back()}

    return (
        <>
            <div id="ingredient-container">
                <div className="single-ingredient-container">
                    <h1> {ingredient.toUpperCase()} </h1>
                    {ingredientData.map((item) => {
                        if (ingredient.toLowerCase() === item.name) {
                            return (
                                <h2> {item.description} </h2>
                            )
                        }
                    })}
                </div>
                <div className="go-back-container" onClick={handleClick}>
                    <div className="go-back-button">
                        <img src={leftArrow} />
                        <p> Back</p>
                    </div>
                </div>
            </div>
        </>
    )
} 

export default Ingredient;