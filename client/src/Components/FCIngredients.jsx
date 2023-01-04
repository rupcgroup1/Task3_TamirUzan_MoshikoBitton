import React from 'react'
import FCIngredient from './FCIngredient';


export default function FCIngredients(props) {
    let ingredientsStr = props.ingredients.map((ingredient) => {
        return <FCIngredient
          id={ingredient.Id}
          name={ingredient.Name}
          key={ingredient.Id}
          img={ingredient.Img}
          calories={ingredient.Calories}
          checkbox={props.checkbox}/>;
      }
      )
      return (
        <div style={{alignItems:"center", gap:10 }}>
          {ingredientsStr}
        </div>
      );
}
