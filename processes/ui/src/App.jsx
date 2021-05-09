import './App.css';
import {useEffect} from 'react';
import {apiClient} from './services/axios'

function App() {

  useEffect(()=>{
    const pingBackend = async () => {
      const reply = await apiClient.get()
      console.log(reply)
    }
    pingBackend()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
