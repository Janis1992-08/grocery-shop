import './App.css'
import ShoppingList from "./components/ShoppingList.tsx";

function App() {


  return (
      <div className="App">
        <header className="App-header">
          <h1>Shopping Lists</h1>
        </header>
        <main>
          <ShoppingList/>
        </main>
      </div>
  )
}

export default App
