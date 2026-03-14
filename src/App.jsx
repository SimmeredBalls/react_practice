import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState("");
  const [people, setPeople] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleInput = (e) => {
    setName(e.target.value);
  }


  const addName = () => {
    if (name.trim() === "") return;

    const newEntry = {
      id: Date.now(),
      firstName: name
    };

    console.log(newEntry);
    setPeople([...people, newEntry]);
    setName(""); 
  }


  const updateName = () => {
    if (name.trim() === "") return;

    const updatedPeople = people.map((person) =>
      person.id === editId ? { ...person, firstName: name } : person
    );

    setPeople(updatedPeople);
    setEditId(null); 
    setName("");     
  }

  const deleteName = (id) => {
    const filteredPeople = people.filter((person) => person.id !== id);
    setPeople(filteredPeople);

    if (id === editId) {
      setEditId(null);
      setName("");
    }
  }

  const startEdit = (person) => {
    setName(person.firstName);
    setEditId(person.id);
  }

  const cancelEdit = () => {
    setEditId(null);
    setName("");
  }

  const deleteAll = () => {

    if (window.confirm("Are you sure you want to delete everyone?")) {
      setPeople([]);
      setEditId(null); 
      setName(""); 
    }
  }

  return (
    <div className="App">
      <h1>Data Entry</h1>
      
      <div className="input-group">
        <input 
          type="text" 
          value={name}
          placeholder={editId ? "Edit name..." : "Enter name here..."}
          onChange={handleInput}
        />

        {editId ? (
          <>
            <button onClick={updateName}>
              Update Name
            </button>
            <button onClick={cancelEdit}>Cancel</button>
          </>
        ) : (
          <button onClick={addName}>Add to List</button>
        )}
      </div>

      <hr />

      <h3>Stored Data:</h3>
      <ul>
        {people.map((person) => (
          <li key={person.id} style={{ 
            marginBottom: '10px', 
          }}>
            <strong>{person.firstName}</strong>
            <button onClick={() => startEdit(person)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => deleteName(person.id)} style={{ marginLeft: '5px', color: 'red' }}>Delete</button>
          </li>
        ))}
      </ul>
      {people.length > 0 && (
        <button 
          onClick={deleteAll} 
            style={{ 
            marginTop: '20px', 
            backgroundColor: '#ff4d4d', 
            color: 'white',
            padding: '10px',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '4px'
            }}
            >
              Clear All Entries
            </button>
          )}

          {people.length === 0 && <p>No data added yet.</p>}
      </div>
    )
}

export default App