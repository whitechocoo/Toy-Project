import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
      <div className="header">
            <span className="myname">
              <NavLink className="nav-link" exact to="/" className="item">React Toy Project</NavLink>
            </span>
            <span className="nav-group">
              <NavLink exact to="/" className="item">Todo</NavLink>&nbsp;&nbsp;
              <NavLink to="/movie" className="item">영화</NavLink>
            </span>
      </div>  
    );
}

export default Header;