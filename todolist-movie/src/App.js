import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header'
import Todomain from './components/Todo/Todomain';
import Moviemain from './components/MovieList/Moviemain';

const App = () => {
  const css = {    background: 'white'
  }
  return (
    <Router>
      <Header style={css}/>
      <Switch>
        <Route exact path="/" component={Todomain} />
        <Route path="/movie" component={Moviemain} />
      </Switch>
    </Router>
  );
}

export default App;

