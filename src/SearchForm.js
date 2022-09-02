import React from 'react';
import { useGlobalContext } from './context';
const SearchForm = () => {
  const { searchTerm, setSearchTerm, error } = useGlobalContext();
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <form className='search-form' onSubmit={handleSubmit}>
      <h2>search movies</h2>
      <input type='text' className='form-input' value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}} />
      {error.show && <div className='error'>{error.msg}</div>}    
    </form>
  );
};

export default SearchForm;
