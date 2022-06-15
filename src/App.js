import logo from "./logo.svg";
import "./App.css";
import "./components/DogList";
import DogList from "./components/DogList";
import Dog from "./components/Dog";

function App() {
  const dogData = [
    {
      name: "Wishbone",
      favoriteToy: "Squeaker",
      chipNumber: "82373",
    },
    {
      name: "Appa",
      favoriteToy: "Ball",
      chipNumber: "29238",
    },
    {
      name: "Jimminy",
      favoriteToy: "Bone",
      chipNumber: "72902",
    },
  ];

  return (
    <div className="App">
      <h1>Our Dog List</h1>
      <DogList dogData={dogData} />
    </div>
  );
}

export default App;
