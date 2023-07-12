import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllDogs,
  getTemperaments,
  FilterByTemperament,
  OrderByName,
  OrderBySource,
  OrderByWeight,
} from "../../Redux/actions";
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar";

import style from "../Home/Home.module.css";

function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);

  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState("");
  const dogsPerPage = 8;
  const lastIndex = currentPage * dogsPerPage;
  const firstIndex = lastIndex - dogsPerPage;
  const currentDogs = allDogs.slice(firstIndex, lastIndex);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterByTemperament = (e) => {
    e.preventDefault();
    dispatch(FilterByTemperament(e.target.value));
    setCurrentPage(1);
  };

  const handleOrderByName = (e) => {
    e.preventDefault();
    dispatch(OrderByName(e.target.value));
    setCurrentPage(1);
  };

  const handleOrderBySource = (e) => {
    e.preventDefault();
    dispatch(OrderBySource(e.target.value));
    setCurrentPage(1);
  };

  const handleOrderByWeight = (e) => {
    e.preventDefault();
    dispatch(OrderByWeight(e.target.value));
    setOrderBy(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <>
      <header className={`${style.header}`}>
        <div className={`${style.header_container_left}`}>
          <Link to="/">
            <div className={`${style.logo}`}>DOGPEDIA</div>
          </Link>
          <div className={`${style.header_left}`}>
            <SearchBar />
            <div className={`${style.container_filters}`}>
              <select onChange={handleOrderByName}>
                <option disabled selected defaultValue>
                  Alphabetical Order
                </option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>

              <select onChange={handleOrderByWeight}>
                <option disabled selected defaultValue>
                  Weight Order
                </option>
                <option value="max_weight">Max</option>
                <option value="min_weight">Min</option>
              </select>

              <select onChange={handleFilterByTemperament}>
                <option disabled selected defaultValue>
                  Temperament Filter
                </option>
                <option value="Todos">All</option>
                {allTemperaments?.map((temp) => (
                  <option value={temp.name} key={temp.id}>
                    {temp.name}
                  </option>
                ))}
              </select>

              <select onChange={handleOrderBySource}>
                <option disabled selected defaultValue>
                  Source Filter
                </option>
                <option value="All">All</option>
                <option value="Db">DB</option>
                <option value="Api">API</option>
              </select>
            </div>
          </div>
        </div>
        <div className={`${style.header_right}`}>
          <Link to="/dog">
            <button className={`${style.button_add_dog}`}>CREATE DOG</button>
          </Link>
        </div>
      </header>

      <hr />

      <div className={style.main_container}>
        <div className={style.container_cards}>
          {currentDogs?.map((el) => (
            <div className={`${style.container_card}`} key={el.id}>
              <Link to={"/dog-detail/" + el.id}>
                <Card
                  key={el.id}
                  image={el.image}
                  name={el.name}
                  weight={el.weight}
                  temperaments={
                    el.temperaments[0]?.name
                      ? el.temperaments.map((el) => el.name)
                      : el.temperaments
                  }
                />
              </Link>
            </div>
          ))}
        </div>
        <div className={`${style.pagination}`}>
          <Paginate
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            paginado={paginado}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
