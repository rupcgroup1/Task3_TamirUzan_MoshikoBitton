import React, { useEffect, useContext } from 'react'
import { useState } from 'react';
import FCIngredients from '../Components/FCIngredients';
import { RecipeIngredients } from "../Components/RecipeIngredientsContext";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


const apiUrl = "/cgroup1/test2/tar6/api/ingredients";

export default function NewRecipe() {
  const { ingredientsList , setIngredientsList} = useContext(RecipeIngredients);
  const [str, setStr] = useState("No ingredients yet, please add some first.");
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [time, setTime] = useState('');
  const [cookingMethod, setCookingMethod] = useState('');
  const [res, setRes] = useState([]);

  useEffect(() => {
    fetch(apiUrl, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      })
    })
      .then(res => {
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch btnFetchGetIngredients= ", result);
          setRes(result);
          setStr(<FCIngredients ingredients={result} checkbox={true} />)
          return result;
        },
        (error) => {
          console.log("err post=", error);
        });

    return () => { }
  }, []);

  useEffect(() => {
    if (!str)
      setStr((prev) => (<FCIngredients ingredients={res} checkbox={true} />));
    console.log(ingredientsList)
    return () => {}
  }, [str]);

  const btnClear = () => {
    setName('');
    setImg('');
    setTime('');
    setCookingMethod('');
    setStr((prev) => (false));
    setIngredientsList((prev) => ([]));
  };
  

  const btnInsert = () => {
    if (!name || !img || !time || !cookingMethod || ingredientsList.length == 0) {
      alert("Please fill the empty fields");
      return;
    }

    const recipe = {
      Id: 0,
      Name: name,
      Img: img,
      CookingMethod: cookingMethod,
      Time: time,
      IngredientsList: ingredientsList
    };

    fetch(apiUrl + "recipes", {
      method: "POST",
      body: JSON.stringify(recipe),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8'
      })
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          btnClear();
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  


  return (
    <div>
      <div style={{ margin: "auto", padding: 50, border: "solid", maxWidth: "fit-content" }}>
        Add new recipe
        <br />
        <label> Name : </label><br />
        <TextField
          id="outlined-Name"
          label="Name"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        /> <br />
        <label> Url : </label><br />
        <TextField
          id="outlined-Url"
          label="Image"
          placeholder="Enter Url"
          onChange={(e) => setImg(e.target.value)}
          value={img}
        /> <br />
        <label> Time : </label><br />
        <TextField
          id="outlined-Time"
          label="Time"
          placeholder="Enter time"
          onChange={(e) => setTime(e.target.value)}
          value={time}
        /> <br />
        <label>Method : </label><br />
        <TextField
          id="outlined-Cooking-method"
          label="Cooking method"
          placeholder="Enter cooking method"
          onChange={(e) => setCookingMethod(e.target.value)}
          value={cookingMethod}
        />
        <br />
        <Stack style={{ marginTop: 15 }} direction="column" spacing={2}>
          <Button onClick={btnInsert} variant="contained" endIcon={<SendIcon />}>
            Add
          </Button>
          <Button onClick={btnClear} variant="contained" startIcon={<DeleteIcon />}>
            Clear form
          </Button>
        </Stack>
      </div>
      <br />

      <div>{str}</div>

    </div>
  )
}
