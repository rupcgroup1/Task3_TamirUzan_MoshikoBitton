import React, { useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';
import {Card} from 'react-bootstrap';
import { RecipeIngredients } from "./RecipeIngredientsContext"
import { useContext } from 'react';


export default function FCIngredient(props) {
  const {setIngredientsList, ingredientsList} = useContext(RecipeIngredients);

  const saveIngredient = (e) =>{
    let id = e.target.value;
    if(e.target.checked){
      let newList = [... ingredientsList, id];
      setIngredientsList(newList);
      return;
    }
    let newList = ingredientsList.filter((num) => num !== id);
    setIngredientsList(newList);
  }

  let str = <Checkbox value={props.id} onChange={saveIngredient} />;
  if (!props.checkbox)
    str='';
  
  return (
    <Card style={{width:'12rem', padding: 5, display:'inline-block', border:"gray solid", borderRadius:10}}>
      <Card.Img style={{height:'13rem',width:'12rem'}} variant="top" src={props.img} />
      <Card.Body style={{textAlign:"center"}}>
        <Card.Title >{props.name}</Card.Title>
        <Card.Text>{props.calories} calories</Card.Text>
        {str}
      </Card.Body>
    </Card>
  )
}
