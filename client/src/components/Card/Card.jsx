import React from "react";
import style from "../Card/Card.module.css";

export default function Card({ image, name, temperaments, weight }) {
  return (
    <div className={style.main_container}>
      <div className={style.image_container}>
        <img className={style.img} src={`${image}`} alt={`imagen de: ${name}`}/>
      </div>
      <h2>{name}</h2>    
      <h3>Weigh: {weight[0]}-{weight[1]} kg</h3>  
      <div className={`${style.temperaments_container}`}>
        {
        temperaments.map((temps) => <h4 key={temps+Math.random}>{temps}</h4>)
        }
      </div>
            
    </div>
  );
}
