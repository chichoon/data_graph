import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [state, setState] = useState();
  useEffect(() => {
    console.log('hihi');
    console.log(state);
  }, []);
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          ㅁㅁㅁ
        </a>
      </header>
    </div>
  );
};

export default App;
