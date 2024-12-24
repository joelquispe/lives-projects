import React from "react";
import "./Tree.css";

const ChristmasCard: React.FC = () => {
  return (
    <div className="card">
      {/* Papá Noel animado */}
      <div className="santa">
        🎅
        <div className="sleigh">🛷</div>
      </div>

      {/* Árbol de Navidad */}
      <div className="tree-container">
        <div className="star">★</div>
        <div className="tree">
          <div className="layer layer1">
            <span className="light light1"></span>
            <span className="light light2"></span>
            <span className="light light3"></span>
          </div>
          <div className="layer layer2">
            <span className="light light1"></span>
            <span className="light light2"></span>
            <span className="light light3"></span>
          </div>
          <div className="layer layer3">
            <span className="light light1"></span>
            <span className="light light2"></span>
            <span className="light light3"></span>
          </div>
          <div className="layer layer4">
            <span className="light light1"></span>
            <span className="light light2"></span>
            <span className="light light3"></span>
          </div>
          <div className="layer layer5">
            <span className="light light1"></span>
            <span className="light light2"></span>
            <span className="light light3"></span>
          </div>
        </div>
        <div className="tree-base"></div>
      </div>

      {/* Mensaje de saludo */}
      <div className="message">
        🎁 <strong>¡Feliz Navidad!</strong> 🎁
        <p>Que la magia de la Navidad ilumine tu corazón y tu hogar. 🌟</p>
        <p>🎄 ¡Te deseo felicidad, paz y amor! 🎄</p>
        
      </div>
    </div>
  );
};

export default ChristmasCard;
