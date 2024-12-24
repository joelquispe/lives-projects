import React from "react";
import "./Light.css";
interface LightProps {
  color: string;
}
const Light: React.FC<LightProps> = ({ color }) => {
  return <div className={`light ${color}`}></div>;
};
export default Light;
