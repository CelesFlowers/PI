const initialState = {
  dogs: [],
  temperaments: [],
  allDogs: [],
  details: [],
  selectedTemperament: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_DOGS":
      action.payload.forEach((element) => {
        if (!element.temperaments[0]) {
          element.temperaments[0] = "no-temperaments";
        }
      });
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };

    case "GET_TEMPERAMENTS":
      const filteredTemps = action.payload.filter((temp) => temp.name !== "");
      return {
        ...state,
        temperaments: filteredTemps,
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
          }
        }
      }

      return {
        ...state,
        dogs: filteredDogs,
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
      const sortedName = action.payload === "A-Z"
        ? [...state.allDogs].sort((a, b) => a.name.localeCompare(b.name))
        : [...state.allDogs].sort((a, b) => b.name.localeCompare(a.name));

      return {
        ...state,
        dogs: sortedName,
      };

    case "ORDER_BY_SOURCE":
      const filtered = state.allDogs;
      if (action.payload === "All") {
        return {
          ...state,
          dogs: filtered,
        };
      }
      if (action.payload === "Api") {
        return {
          ...state,
          dogs: filtered.filter((e) => e.createdInDb === false),
        };
      }
      if (action.payload === "Db") {
        return {
          ...state,
          dogs: filtered.filter((e) => e.createdInDb === true),
        };
      }
      return state;

      case "ORDER_BY_WEIGHT":
  const sortedWeight = [...state.dogs].sort((a, b) => {
    const aMinWeight = parseInt(a.weight[0].split(',')[0]);
    const bMinWeight = parseInt(b.weight[0].split(',')[0]);

    // Verificar si aMinWeight es un número válido, de lo contrario, asignarle el valor 0
    const parsedAMinWeight = isNaN(aMinWeight) ? 0 : aMinWeight;

    // Verificar si bMinWeight es un número válido, de lo contrario, asignarle el valor 0
    const parsedBMinWeight = isNaN(bMinWeight) ? 0 : bMinWeight;

    return action.payload === "min_weight"
      ? parsedAMinWeight - parsedBMinWeight
      : parsedBMinWeight - parsedAMinWeight;
  });

  return {
    ...state,
    dogs: sortedWeight,
  };

      

    case "SHOW_DOG_DETAILS":
      let myDetails = action.payload;
      if (!myDetails[0].temperaments[0]) {
        myDetails[0].temperaments[0] = "no-temperaments";
      }
      return {
        ...state,
        details: myDetails,
      };

    default:
      return state;
  }
};

export default rootReducer;
