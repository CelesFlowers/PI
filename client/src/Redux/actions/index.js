import axios from "axios";
//const urlMyApi = "http://localhost:3001";

export function getAllDogs() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/dogs");
        return dispatch({//necesario para despachar la accion
            type: "GET_ALL_DOGS",
            payload: json.data
        });
    }
};

export function getTemperaments() {
  return async function (dispatch) {
      var json = await axios.get("http://localhost:3001/temperaments"); //axios.get(`${urlMyApi}/temperament`)
      return dispatch({
          type: "GET_TEMPERAMENTS",
          payload: json.data,
      });
    }  
};

export const selectTemperament = (temperament) => {
    return {
      type: "SELECT_TEMPERAMENT",
      payload: temperament,
    };
  };

export function FilterByTemperament(payload) {
    return{
        type: "GET_FILTER_TEMPERAMENTS",
        payload
    }
};

export function getBreed(payload) {//dogs by name
    return async function (dispatch) {//Dispatch que podemos usar gracias a la asincronia provista por el middleware thunk
        try {
            var json = await axios.get(`/dogs?name=${payload}`) //axios.get(`${urlMyApi}/dogs?name=${payload}`)
            if (json.data)
            return dispatch ({
                type: "GET_BREED",
                payload: json.data
            })
        } catch (error) {
            return  alert(`Dog not Found!`)
        }
    }
};

export function OrderByName(payload) {
    return { 
        type: "ORDER_BY_NAME",
        payload
    }
};

export function OrderBySource(payload) {
    return { 
        type: "ORDER_BY_SOURCE",
        payload
    }
};

export function OrderByWeight(payload) {
    return { 
        type: "ORDER_BY_WEIGHT",
        payload
    }
};

export function showDogDetails(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("/dogs/"+id, { //axios.get("http://localhost:3001/dogs/"+id
        });
        return dispatch({
            type: "SHOW_DOG_DETAILS",
            payload: json.data
        });
        } catch (error) {
            console.log(error);
        }
    }
};

export function postDog(payload) {
    return async function () {
        const data = await axios.post("/dogs", payload); //axios.post("http://localhost:3001/dog"
        return data;
    }
}