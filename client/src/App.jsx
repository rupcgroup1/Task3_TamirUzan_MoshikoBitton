import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';

import MyKitchen from './Pages/MyKitchen'
import NewIngredient from './Pages/NewIngredient'
import NewRecipe from './Pages/NewRecipe'


function App() {
  return (
    <div className="App">
      <div style={{ margin: 20, fontSize: 25 }}>
        <Link to="/">My Kitchen</Link> |
        <Link to="/NewIngredient">Create new ingredient</Link> |
        <Link to="/NewRecipe">Create new recipe</Link>
      </div>

      <header className="App-header">
        <Routes>
          <Route path="/" element={<MyKitchen />} />
          <Route path="/newIngredient" element={<NewIngredient />} />
          <Route path="/newRecipe" element={<NewRecipe />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
