import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setNameOfSearchedBreeds } from '../../features/breedsSlice';
import { useAppDispatch } from '../../hooks/hooks';
import './SearchBreedForm.scss';

const SearchBreedForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [value, setValue] = useState('');

  const handleSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setNameOfSearchedBreeds(value));
    navigate(`macpaw-test/search`);
  };

  return (
    <form typeof="form" className="search-breed-form" onSubmit={handleSubmitSearch}>
        <input
          type="text"
          placeholder="Search for breeds by name"
          className="search-breed-form__input"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
        <button
          type="submit"
          className="search-breed-form__button"
        >
        </button>
      </form>
  )
}

export default SearchBreedForm;