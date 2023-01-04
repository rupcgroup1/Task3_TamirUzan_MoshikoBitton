import FCRecipe from "./FCRecipe";


export default function FCRecipes(props) {



  let recipesStr = props.recipes.map((recipe) => {
    return <FCRecipe
      id={recipe.Id}
      name={recipe.Name}
      cookingMethod={recipe.CookingMethod}
      key={recipe.Id}
      img={recipe.Img}
      time={recipe.Time}
      styleBtn={props.styleBtn}/>;
  }
  )

  return (
      <div style={{alignItems:"center", gap:10 }}>
        {recipesStr}
      </div>
  );

}