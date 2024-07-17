import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import UserList from './components/UserList';
import AddressForm from './components/AddressForm';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/users" component={UserList} />
          <Route path="/address" component={AddressForm} />
          <Route component={ErrorPage} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;