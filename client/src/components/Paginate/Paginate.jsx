import React from "react";
import style from "../Paginate/Paginate.module.css";

export default function Paginate({ dogsPerPage, allDogs, paginado, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={style.nav_container}>
      <ul className={style.ul_container}>
        {pageNumbers.map(number => (
          <li
            className={`${style.li_container} ${currentPage === number ? style.current_page : ''}`}
            onClick={() => paginado(number)}
            key={number}
          >
            <button className={`${style.button_pagination} ${currentPage === number ? style.current_page : ''}`} type="button">{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
