import React, {useEffect, useState} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    try {
      const response = await api.post(`repositories`,
      {
        title: `Desafio ${Date.now()}`,
        url: "http://github.com/...",
        techs: ["Node.js", "..."]
      });

      const repository = response.data;

      setRepositories([...repositories, repository]);
    } catch (error) {}
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      setRepositories(repositories.filter(repository => repository.id !== id));
    } catch (error) {}
  }

  useEffect(() => {
    api.get('repositories').then(response => {
      if(response){
        setRepositories(response.data);
      }
    });
  }, [setRepositories]);

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => (
        <li key={repository.id.toString()}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
      ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
