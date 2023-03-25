import React from "react";
import { Link } from "react-router-dom";
import style from "../LandingPage/LandingPage.module.css";
import "../LandingPage/ButtonHome.css"

function LandingPage() {
  return (    
      <div className={`${style.main_left_container}`}>
        <h1 className={`${style.titleApp}`} >DOG BREED PEDIA</h1>
        <h3>Learn more about your best friend</h3>
        <div className={`${style.left_paragraph}`}>
          <p> Whith this app you can get information about dog breeds' names and details such as their size, life span and temperament, and you can also add new ones</p>        
        
        <Link to="/home">
            <button className="button_home">Go home</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
