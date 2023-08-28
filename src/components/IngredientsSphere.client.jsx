import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { SphereGeometry, Vector3 } from "three";
import "../styles/ingredients.css";

const IngredientLightBox = ({ingredient}) => {
    return (
        <>
            <div id="ingredient-lightbox">
                <div className="ingredient-container">
                    <h1> {ingredient} </h1>
                </div>
            </div>
        </>
    )
}

const SphereText = ({ radius, segments, rings, setIngredient }) => {
    const sphereRef = useRef();

    useFrame(() => {
        if (sphereRef.current) {
            sphereRef.current.rotation.y += 0.0005;
        }
    });

    const words = [
        "Cocoa Butter", "Jojoba Oil", "Shea Butter",
        "Almond Oil", "Macadamia Oil", "Aloe",
        "Caster Oil", "Vitamin E Oil", "Soy Wax",
        "Glycerin", "Coconut Oil", 
    ];

    const handleClick = (e) => {
        setIngredient(e.target.innerText);
    }

    const textElements = words.map((word, index) => {
        const angle = (index / words.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
    
        return (
          <Html key={index} position={new Vector3(x, 1, z)}>
            <div className="text-element" onClick={(e) => handleClick(e)}>{word}</div>
          </Html>
        );
    });

    return (
        <group ref={sphereRef} position={[0, 0, 0]}>
            <mesh position={[0, 0, 0]} geometry={new SphereGeometry(radius, segments, rings)}>
                <meshBasicMaterial color="#fff" wireframe={true} transparent={true} opacity={0}/>
            </mesh>
            {textElements}
        </group>
    )
}

const IngredientsSphere = () => {
    const [ingredient, setIngredient] = useState("");

    return (
        <>
            <div id="sphere-canvas">
                <Canvas>
                    <ambientLight />
                    <SphereText radius={3} segments={30} rings={32} setIngredient={setIngredient}/>
                    <OrbitControls />
                </Canvas>
            </div>
            <IngredientLightBox ingredient={ingredient}/>
        </>
    )
}

export default IngredientsSphere;
