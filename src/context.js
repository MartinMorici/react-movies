import React, { useState, useContext, useEffect } from 'react';

// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: '' });
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('Harry Potter');

  const fetchMovies = async (url) => {
    setIsLoading(true);
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
        setError({ show: false, msg: '' });
      } else {
        setError({ show: true, msg: data.Error });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies(API_ENDPOINT + '&s=' + searchTerm);
  }, [searchTerm]);

  return (
    <AppContext.Provider value={{ isLoading, movies, error, searchTerm, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
