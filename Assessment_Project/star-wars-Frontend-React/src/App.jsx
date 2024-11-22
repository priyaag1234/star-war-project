import React, { useState } from "react";
import "./style.css";

const App = () => {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [results, setResults] = useState([]);

  const validateForm = () => {
    if (type === "" || name.trim() === "") {
      setError(true);
    } else {
      setError(false);
      fetchDetails();
    }
  };

  const fetchDetails = async () => {
    setResults([]);
    try {
      const response = await fetch(`http://localhost:8080/api/search?type=${type}&name=${name}`);
      const data = await response.json();
      if (data.count > 0) {
        setResults(data.results);
      } else {
        setResults([{ name: "No results found." }]);
      }
    } catch (error) {
      setResults([{ name: "Error fetching data. Please try again later." }]);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Star Wars Information Finder</h1>
      </header>
      <main>
        <div className="form-section">
          <label htmlFor="type">Type:</label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">--Select Type--</option>
            <option value="planets">Planets</option>
            <option value="starships">Starships</option>
            <option value="vehicles">Vehicles</option>
            <option value="people">People</option>
            <option value="films">Films</option>
            <option value="species">Species</option>
          </select>

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name here"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {error && <p id="error-message" style={{ color: "red" }}>Please fill out all fields before searching.</p>}

          <button onClick={validateForm}>Search</button>
        </div>
        <div className="results-section">
          {results.map((item, index) => (
            <div key={index} className="result-item">
              <h3>{item.name || item.title}</h3>
              <p>Details: {JSON.stringify(item)}</p>
            </div>
          ))}
        </div>
      </main>
      <footer>
        <p>&copy; 2024 Star Wars Information Finder</p>
      </footer>
    </div>
  );
};

export default App;
