import { useState, useEffect } from "react";
import "./App.css";
import CatList from "./components/CatList";
import axios from "axios";
// import catDataJson from './data/catData.json';
import NewCatForm from "./components/NewCatForm";

const kBaseUrl = 'http://localhost:5000';

const catApiToJson = cat => {
  const { caretaker, color, id, name, personality, pet_count: petCount } = cat;
  return { caretaker, color, id, name, personality, petCount };
};

const getCatsAsync = () => {
  return axios.get(`${kBaseUrl}/cats`) // promise1
  .then(response => {
    return response.data.map(catApiToJson);
  })  // promise 2
  .catch(err => {
    console.log(err);
    throw new Error("error fetching cats");
  })  // promise 3
};

const petCatAsync = id => {
  return axios.patch(`${kBaseUrl}/cats/${id}/pet`) // promise1
  .then(response => {
    return catApiToJson(response.data);
  })  // promise 2
  .catch(err => {
    console.log(err);
    throw new Error(`error while petting cat ${id}`);
  })  // promise 3
};

const removeCatAsync = id => {
  return axios.delete(`${kBaseUrl}/cats/${id}`) // promise1
  .catch(err => {
    console.log(err);
    throw new Error(`error removing cat ${id}`);
  })  // promise 3
};

const registerCatAsync = catData => {
  const requestBody = { ...catData, pet_count: 0 };

  return axios.post(`${kBaseUrl}/cats`, requestBody) // promise1
  .then(response => {
    return catApiToJson(response.data);
  })  // promise 2
  .catch(err => {
    console.log(err);
    throw new Error('error registering cat');
  })  // promise 3
};



function App() {
  const [ catData, setCatData ] = useState([]);

  const updateCats = () => {
    getCatsAsync()
    .then(cats => {
      setCatData(cats);
    })
    .catch(err => {
      console.log(err.message);
    });
  };

  useEffect(() => {
    updateCats();
  }, []);
  
  const updateCat = (id) => {
    // console.log(`cat id ${id} says purr!`);
    petCatAsync(id)
    .then(updatedCat => {
      setCatData(oldData => {
        return oldData.map(cat => {
          if (cat.id === id) {
            return updatedCat;
          } else {
            return cat;
          }
        });  
      });
    })
    .catch(err => {
      console.log(err.message);
    });
  };

  const unregisterCat = id => {
    // console.log(`unregister cat id ${id}`)
    removeCatAsync(id)
    .then(cat => {  
      setCatData(oldData => {
        return oldData.filter(cat => {
          return cat.id !== id;
        });
      });
    })
    .catch(err => {
      console.log(err.message);
    });
  };

  const registerCat = catData => {
    registerCatAsync(catData)
    .then(newCat => {
      // With the functional style of the set state functions, the current
      // state value is passed in as an input parameter, which here we named
      // oldData
      
      setCatData(oldData => [ ...oldData, newCat ]);

      // Could have been written as follows:
      //
      // const newData = [ ...catData, newCat ];
      // setCatData(newData);
      //
      // But especially when async code is involved, the functional style
      // of setting state, where we pass in an update function rather than
      // the actual value, tends to be more robust to asynchronous code
      // when multiple things could be occurring simultaneously
    })
    .catch(err => {
      console.log(err.message);
    });
  };

  const totalPets = catData.reduce((total, cat) => {
    return total + cat.petCount;
  }, 0);

  const handleCatDataReady = (formData) => {
    console.log(formData);
    registerCat(formData);
  };

  return (
    <main>
      <h1>
        <div>List of Cats</div>
        <div>Total pets: {totalPets}</div>
      </h1>
      <NewCatForm onCatDataReady={handleCatDataReady} />
      <CatList 
        catData={catData} 
        onPetCat={updateCat} 
        onUnregister={unregisterCat} 
        />
    </main>
  );
}

export default App;
