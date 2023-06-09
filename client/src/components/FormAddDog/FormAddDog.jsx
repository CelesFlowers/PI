import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTemperaments, postDog, selectTemperament } from "../../Redux/actions";
import style from "../FormAddDog/FormAddDog.module.css";

const validate = (form) => {
    let errors = {}
    if(!form.name) {
        errors.name = "Breed is required, it should not contain numbers"
    }
    if(form.name.length !== 0){
        if(!/^[a-z A-Z,.'-]+$/.test(form.name)) {
            errors.name = "Not valid breed name, should not contain numbers";
        }
    }
    if(!form.min_height || !form.max_height || isNaN(form.min_height) || isNaN(form.max_height)) {
        errors.height = "Height is required & should be numbers"
    }
    if (parseInt(form.min_height) >= parseInt(form.max_height)) {
        errors.height = "Min height should be lower than max height"
    }
    
    if(!form.min_weight || !form.max_weight || isNaN(form.min_weight) || isNaN(form.max_weight)) {
        errors.weight = "Weight is required & should be numbers"
    }
    if (parseInt(form.min_weight) >= parseInt(form.max_weight)) {
        errors.weight = "Min weight should be lower than max weight"
    }
    if(!form.life_span) {
        errors.life_span = "Lifespan is required, type only numbers separated by a dash (-)"
    }
    if(/[a-zA-Z]/.test(form.life_span)){
        errors.life_span = "Type only numbers separated by a dash (-)"
    }
    if(form.life_span.length && !/^(\d{1,2})-(\d{1,2})$/.test(form.life_span)){
        errors.life_span = "Type only numbers separated by a dash (-)"
    }
    if (form.life_span.length) {
        const [minLifespan, maxLifespan] = form.life_span.split('-');
        if (parseInt(minLifespan) >= parseInt(maxLifespan)) {
            errors.life_span = "Min lifespan should be lower than max lifespan";
        }
    }
    return errors
}

export default function FormAddDog() {
    
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments);
    const selectedTemperament = useSelector((state) => state.selectedTemperament);

    const [button, setButton] = useState(true);
    const [errors, setErrors] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span:  "",
        image: "",
    });

    const [form, setForm] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span:  "",
        image: "",
        temperaments: [],
    })

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    useEffect(() => {
        if (
          form.name.length > 0 &&
          !/\d/.test(form.name) &&
          form.min_height.length > 0 &&
          /^\d{1,2}(\.\d{1,2})?$/.test(form.min_height) &&
          form.max_height.length > 0 &&
          /^\d{1,2}(\.\d{1,2})?$/.test(form.max_height) &&
          parseFloat(form.min_height) < parseFloat(form.max_height) &&
          form.min_weight.length > 0 &&
          /^\d{1,2}(\.\d{1,2})?$/.test(form.min_weight) &&
          form.max_weight.length > 0 &&
          /^\d{1,2}(\.\d{1,2})?$/.test(form.max_weight) &&
          parseFloat(form.min_weight) < parseFloat(form.max_weight) &&
          form.life_span.length > 0 &&
          !/[a-zA-Z]/.test(form.life_span) &&
          /^(\d{1,2})-(\d{1,2})$/.test(form.life_span) &&
          parseFloat(form.min_height) <= parseFloat(form.max_height) &&
          form.min_height !== form.max_height &&
          parseInt(form.life_span.split("-")[0]) < parseInt(form.life_span.split("-")[1])
        ) {
          setButton(false);
        } else {
          setButton(true);
        }
      }, [form, setButton]);
      
      
      
    

    const handleSubmit = (e) => {
        e.preventDefault();  
                     
        dispatch(postDog(form));
        alert("The new breed was added successfully");
        setForm({
            name: "",
            min_height: "",
            max_height: "",
            min_weight: "",
            max_weight: "",
            life_span: "",
            image: "",
            temperaments: []
        });
        
    
    }
    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value //el valor del atributo modificado del estado en el form se actualizara con lo escrito en dicho campo
        });
        setErrors(validate({
            ...form,
            [e.target.name] : e.target.value
        }))
    }
    
    const handleSelect = (e) => {
        const selectedTemperament = e.target.value;
        setForm((prevForm) => ({
          ...prevForm,
          temperaments: [...prevForm.temperaments, selectedTemperament],
        }));
      };
      
      const handleDelete = (el) => {
        const updatedTemperaments = form.temperaments.filter((temp) => temp !== el);
        setForm((prevForm) => ({
          ...prevForm,
          temperaments: updatedTemperaments,
        }));
      };
      

    return(
        <div className={style.main_wrapper}>
            <div className={style.container}>
                <Link to="/home">
                    <button className={style.button_to_home}>Go home</button>
                </Link>
                <form action="" id="form" onSubmit={handleSubmit} className={`${style.form}`}>
                    <div className={style.name_container}>
                        <input className={style.input_name} type="text" value={form.name} name="name" onChange={(e) => handleChange(e)} placeholder="Name..."/>
                    </div>
                    <div className={style.error_form}>{errors.name && <p>{errors.name}</p>}</div> {/*mesaje ed error de nombre*/}

                    <div className={style.height_container}>
                        <div className={style.min_height}>
                            <input type="text" value={form.min_height} name="min_height" placeholder="Min height..." onChange={(e) => handleChange(e)}/>
                        </div>
                        
                        <div className={style.max_height}>
                            <input type="text" value={form.max_height} name="max_height" placeholder="Max height..." onChange={(e) => handleChange(e)}/>
                        </div>
                    </div>
                    <div className={style.error_form}>{errors.height && <p>{errors.height}</p>}</div>{/* espacio para agregar error */}{/* espacio para agregar error */}

                    <div className={style.weight_container}>
                        <div className={style.min_weight}>
                            <input type="text" value={form.min_weight} name="min_weight" placeholder="Min weight..." onChange={(e) => handleChange(e)}/>
                        </div>

                        <div className={style.max_weight}>
                            <input type="text" value={form.max_weight} name="max_weight" placeholder="Max weight..." onChange={(e) => handleChange(e)}/>
                        </div>
                    </div>
                    <div className={style.error_form}>{errors.weight && <p>{errors.weight}</p>}</div>{/* espacio para agregar error */}

                    <div className="life-span-container">
                        <input type="text" autoComplete="off" name="life_span" value={form.life_span} placeholder="lifespan exam: 10-12" onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className={style.error_form}>{errors.life_span && <p>{errors.life_span}</p>}</div>{/* espacio para agregar error */}

                    <div className="image-container">
                        <input type="text" autoComplete="off" value={form.image} name="image" placeholder="Image URL..." onChange={(e) => handleChange(e)}/>
                    </div>

                    <div className={""}>
                        <h3>Select Temperaments</h3>
                    </div>

                    <div className={""}>
                    <select
    className={style.select_temperaments}
    onChange={handleSelect}
    value={selectedTemperament}
  >
    <option disabled value="">
      Temperaments
    </option>
    {temperaments.map((d) => (
      <option
        value={d.name}
        key={d.name + Math.random()}
        className={style.option_temperament}
      >
        {d.name}
      </option>
    ))}
  </select>
                    </div>

                    <div className={style.container_button_add_dog}>
                        <button className={style.button_add_dog} disabled={button} type="submit" form="form">Create Dog</button>
                    </div>
                </form>

            

                <div className="">
                    <div className="">
                        <h2>Temperaments</h2>
                    </div>

                    <div className={style.container_temperaments}>
                    {form.temperaments.map((el, index) => (
  <div className={style.element_temperament} key={index} onClick={() => handleDelete(el)}>
    <p>{el}</p>
  </div>
))}
                    </div>
                </div>
            </div>
        </div>
    )
}
