import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState("");
  
  const [people, setPeople] = useState([]);

  const handleInput = (e) => {
    setName(e.target.value);
  }

  const addName = () => {
    if (name.trim() === "") return; 

    const newEntry = {
      id: Date.now(),
      firstName: name
    };

    setPeople([...people, newEntry]);
    
    setName("");
  }

  return (
    <div className="App">
      <h1>Data Entry</h1>
      
      <div className="input-group">
        <input 
          type="text" 
          value={name}
          placeholder="Enter name here..."
          onChange={handleInput}
        />
        <button onClick={addName}>Add to List</button>
      </div>

      <hr />

      <h3>Stored Data:</h3>
      <ul>
        {people.map((person) => (
          <li key={person.id}>
            <strong>ID:</strong> {person.id} | <strong>Name:</strong> {person.firstName}
          </li>
        ))}
      </ul>

      {people.length === 0 && <p>No data added yet.</p>}
    </div>
  )
}

export default App