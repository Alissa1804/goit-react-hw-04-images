import { Component } from 'react';
import {
  SearchbarS,
  Searchform,
  SearchBtn,
  BtnLabel,
  Input,
} from './Searchbar.styled';
import { ImSearch } from '../../../node_modules/react-icons/im';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    q: '',
  };

  changeHandler = event => {
    this.setState({ q: event.currentTarget.value.toLowerCase() });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.q);
    this.setState({ q: '' });
  };

  static propTypes = {
    submitHandler: PropTypes.func.isRequired,
  };

  render() {
    return (
      <SearchbarS className="searchbar">
        <Searchform className="form" onSubmit={this.submitHandler}>
          <SearchBtn type="submit" className="button">
            <ImSearch style={{ width: 20, height: 20, fill: '#BE8BA1' }} />
            <BtnLabel className="button-label">Search</BtnLabel>
          </SearchBtn>

          <Input
            onChange={this.changeHandler}
            value={this.state.q}
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Searchform>
      </SearchbarS>
    );
  }
}

export default Searchbar;
