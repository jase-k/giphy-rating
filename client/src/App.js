import logo from './logo.svg';
import './App.css';
import Index from './Views/Index';
import {
  BrowserRouter,
  Switch, 
  Route, 
  Routes
} from "react-router-dom"
import OneGIf from './Views/OneGIf';
import { useState } from 'react';
import Home from './Views/home/Home';

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <BrowserRouter>
      <div className="App">
      <Routes>
          <Route exact path="/" element={< Index setUserId={setUserId}/>} />
      </Routes>
      <Routes>
          <Route exact path="/home" element={< Home setUserId={setUserId} interaction="trending" userId={userId}/>} />
      </Routes>
      <Routes>
          <Route exact path="/gifs/:id/comment" element={< Home interaction="comment" userId={userId}/>} />
      </Routes>
      <Routes>
          <Route exact path="/gifs/:id/rate" element={< Home interaction="rating" userId={userId}/>} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
