import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Moviemain.css';
import Loading from './Loading';

function Moviemain() {
    const [movies, setMovies] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchTitles = async () => {
        try {
          setError(null);
          setMovies(null);
          setLoading(true);
          
          const response = await axios.get(
            'https://yts.mx/api/v2/list_movies.json?limit=50'
          );
          setMovies(response.data.data.movies);
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      };

      fetchTitles();
    }, []);


    console.log(movies);
    
    if (loading) return <Loading />
    if (error) return <div>ERROR!</div>;
    if (!movies) return null;

    return (
      <div className="movie-div">
        <div className="title">Movies</div>
        <main className="movie-main">
            <ul>
            {movies.map(movies => (
              <li key={movies.id}>
                {movies.title}
              </li>
            ))}
          </ul>
        </main>
      </div>
    );
  
}

export default Moviemain;