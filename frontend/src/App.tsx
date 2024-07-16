import './App.css'
import ShoppingList from "./components/ShoppingList.tsx";
import ShoppingListDetail from "./components/ShoppingListDetail.tsx";
import {Route, Routes} from "react-router-dom";


function App() {


  return (
      <div className="App">
          <main>
              <Routes>
                  <Route path="/" element={<ShoppingList/>}/>
                  <Route path="/:id" element={<ShoppingListDetail/>}/>
              </Routes>
          </main>
      </div>
  )
}

export default App
