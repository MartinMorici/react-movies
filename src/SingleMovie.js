import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_ENDPOINT } from './context';
import Movies from './Movies';

const SingleMovie = () => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true)
  const { movieId } = useParams();
  const url = API_ENDPOINT + '&i=' + movieId;
  const fetchMovie = async () => {
    setIsLoading(true)
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      if (data.Response === 'True') {
        const { Poster, Title, Year, Plot } = data;
        const newMovie = { Poster, Title, Year, Plot };
        setMovie(newMovie);
        setIsLoading(false)
      } else {
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);


  if (isLoading) {
    return <div className="loading"></div>
  }

  return (
    <section className='single-movie'>
      <img src={movie.Poster} alt={movie.Title} />
      <div className='single-movie-info'>
        <h2>{movie.Title}</h2>
        <p>{movie.Plot}</p>
        <h4>{movie.Year}</h4>
        <Link className='btn' to="/"> Back To Home</Link>
      </div>
    </section>
  );
};

export default SingleMovie;
