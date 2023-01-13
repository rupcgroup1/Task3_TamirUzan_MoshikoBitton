import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import FCRecipes from "../Components/FCRecipes"


const apiUrl = "/cgroup1/test2/tar6/api/recipes";

export default function MyKitchen() {
  const [str, setStr] = useState(<div>
    No Recipes yet, please add some first.
  </div>)

  useEffect(() => {
    fetch(apiUrl, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      })
    })
      .then(res => {
        return res.json()
      })
      .then(
        (result) => {
          console.log("fetch btnFetchGetRecipes= ", result);
          setStr(<FCRecipes styleBtn='success' recipes={result} />)
          return result;
        },
        (error) => {
          console.log("err post=", error);
        });

    return () => { }
  }, [])





  return (
    <div>
      {str}      
    </div>
  )
}
