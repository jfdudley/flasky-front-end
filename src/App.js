import logo from "./logo.svg";
import "./App.css";
import "./components/DogList";
import DogList from "./components/DogList";
import Dog from "./components/Dog";

function App() {
  return (
    <div className="App">
      <h1>Our Dog List</h1>
      <DogList />
    </div>
  );
}

export default App;
