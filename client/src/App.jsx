import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';

import MyKitchen from './Pages/MyKitchen'
import NewIngredient from './Pages/NewIngredient'
import NewRecipe from './Pages/NewRecipe'

const apiUrl = '/cgroup1/test2/tar6/build';

function App() {
  return (
    <div className="App">
      <div style={{ margin: 20, fontSize: 25 }}>
        <Link to={apiUrl + "/"}>My Kitchen</Link> |
        <Link to={apiUrl + "/NewIngredient"}>Create new ingredient</Link> |
        <Link to={apiUrl + "/NewRecipe"}>Create new recipe</Link>
      </div>

      <header className="App-header">
        <Routes>
          <Route path={apiUrl + "/"} element={<MyKitchen />} />
          <Route path={apiUrl + "/NewIngredient"} element={<NewIngredient />} />
          <Route path={apiUrl + "/NewRecipe"} element={<NewRecipe />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
