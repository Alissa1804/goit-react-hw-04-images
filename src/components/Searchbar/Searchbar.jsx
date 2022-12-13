import { useState } from 'react';
import {
  SearchbarS,
  Searchform,
  SearchBtn,
  BtnLabel,
  Input,
} from './Searchbar.styled';
import { ImSearch } from '../../../node_modules/react-icons/im';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [q, setQ] = useState('');

  const changeHandler = event => {
    setQ(event.currentTarget.value.toLowerCase());
  };

  const submitHandler = event => {
    event.preventDefault();
    onSubmit(q);
    setQ('');
  };

  return (
    <SearchbarS className="searchbar">
      <Searchform className="form" onSubmit={submitHandler}>
        <SearchBtn type="submit" className="button">
          <ImSearch style={{ width: 20, height: 20, fill: '#BE8BA1' }} />
          <BtnLabel className="button-label">Search</BtnLabel>
        </SearchBtn>

        <Input
          onChange={changeHandler}
          value={q}
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Searchform>
    </SearchbarS>
  );
};

Searchbar.propTypes = {
  submitHandler: PropTypes.func,
};
