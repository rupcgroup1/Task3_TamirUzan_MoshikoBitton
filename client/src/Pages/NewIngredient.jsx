import React from "react";
import { useState } from "react";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


const apiUrl = "http://localhost:49881/api/ingredients";

export default function NewIngredient() {
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [calories, setCalories] = useState('');

  const btnInsert = () => {
    if (!name || !img || !calories) {
      alert("Please fill the empty fields");
      return;
    }

    const ingredient = {
      Name: name,
      Img: img,
      Calories: calories
    };
    fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8'
      })
    })
      .then((res) => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  const btnClear = () => {
    setName('');
    setImg('');
    setCalories('');
  };

  return (
    <div style={{ padding: 50, border: "solid", maxWidth: "fit-content" }}>
      Add new ingredient
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
      <label> Calories : </label><br />
      <TextField
        id="outlined-Calories"
        label="Image"
        placeholder="Enter Calories"
        onChange={(e) => setCalories(e.target.value)}
        value={calories}
      /> <br />
        <Stack style={{marginTop:15}} direction="column" spacing={2}>
        <Button onClick={btnInsert} variant="contained" endIcon={<SendIcon />}>
          Add
        </Button>
        <Button onClick={btnClear} variant="contained" startIcon={<DeleteIcon />}>
          Clear form
        </Button>
      </Stack>
    </div>
  );
}
