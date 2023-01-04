import { Card, Button } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../popup.css';
import { useState, useEffect } from 'react';
import FCIngredients from '../Components/FCIngredients';

const apiUrl = "http://localhost:49881/api/recipes/";

export default function FCRecipe(props) {
  const [str, setStr] = useState("No ingredients yet, please add some first.");


  useEffect(() => {
    fetch(apiUrl + props.id, {
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
          setStr(<FCIngredients ingredients={result} checkbox={false} />)
          return result;
        },
        (error) => {
          console.log("err post=", error);
        });

    return () => { }
  }, []);


  return (
    <Card style={{ width: '18rem', padding: 5, display: 'inline-block', border: "gray solid", borderRadius: 10 }}>
      <Card.Img style={{ height: '15rem', width: '18rem' }} variant="top" src={props.img} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.cookingMethod}</Card.Text>
        <Card.Text>{props.time}</Card.Text>
        </Card.Body>






        <Popup
          trigger={<button className="button"> Show Ingredients </button>}
          modal
          nested
        >
          {close => (
            <div className="modal">
              <button className="close" onClick={close}>
                &times;
              </button>
              <div className="header"> Recipe ingredients </div>
              <div className="content">
                {str}
              </div>
              <div className="actions">
                <button
                  className="button"
                  onClick={() => close()}>
                  Close
                </button>
              </div>
            </div>
          )}
        </Popup>




      
    </Card>
  );
}



