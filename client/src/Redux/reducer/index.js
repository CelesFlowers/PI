// import {
//   GET_ALL_DOGS,
//   GET_TEMPERAMENTS,
//   GET_FILTER_TEMPERAMENTS,
//   GET_BREED,
//   ORDER_BY_NAME,
//   ORDER_BY_WEIGHT,
// } from "../types/index";

const intialState = {
  dogs: [],
  temperaments: [],
  allDogs: [],
  details: [],
  selectedTemperament: "",
};

const rootReducer = (state = intialState, action) => {
  switch (action.type) {
    case "GET_ALL_DOGS":
      action.payload.forEach(element => {
        if (!element.temperaments[0]) {
          element.temperaments[0] = "no-temperaments" //eliminamos arreglos vacios de temperamentos
        }
      });
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case "GET_TEMPERAMENTS":
      const filteresTemp = action.payload.filter((temp) => temp.name !== ""); //eliminar razas con strings vacios
      return {
        ...state,
        temperaments: filteresTemp,
      };

    case "GET_FILTER_TEMPERAMENTS":
      const allDogs = state.allDogs;
      let filteredDogs = [];
      if (action.payload === "Todos") {
        filteredDogs = allDogs;
      } else {
        for (let i = 0; i < allDogs.length; i++) {
          let found = allDogs[i].temperaments.find((t) => t === action.payload);
          if (found) {
            filteredDogs.push(allDogs[i]);
          } //todos los perros en la posicion de ese momento
        }
      }
      
      return {
        //return funciona correcto
        ...state,
        dogs: filteredDogs//.concat(filterDB)
      };

      case "SELECT_TEMPERAMENT":
      return {
        ...state,
        selectedTemperament: action.payload,
      };
      
    case "GET_BREED":
      return {
        ...state,
        dogs: action.payload,
      };
    case "ORDER_BY_NAME":
      const sortedName =
        action.payload === "A-Z"
          ? state.dogs.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedName,
      };

      case "ORDER_BY_SOURCE":
        const filtrado = state.allDogs
    if(action.payload === "All"){
        return {
            ...state,
            dogs: filtrado
        }
    }
    if(action.payload === "Api"){
        return {
            ...state,
            dogs: filtrado.filter(e => e.createdInDb === false)
        }
    }
    if(action.payload === "Db"){
        return {
            ...state,
            dogs: filtrado.filter(e => e.createdInDb === true)
        }
    } return state;
      

    case "ORDER_BY_WEIGHT":
      const sortedWeight =
        action.payload === "min_weight"
          ? state.dogs.sort((a, b) => {
              if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                return 1;
              }
              if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort((a, b) => {
              if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                return -1;
              }
              if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedWeight,
      };
    case "SHOW_DOG_DETAILS":
      let myDetails = action.payload
      if (!myDetails[0].temperaments[0]) { //agregamos "no-temperaments" a arreglos sin elementos dentro
        myDetails[0].temperaments[0] = "no-temperaments"
      }
      return {
        ...state,
        details: myDetails
      };
    default:
      return state;
  }
};

export default rootReducer;
