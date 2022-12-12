import { Btn } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ clickHandler }) => {
  return (
    <Btn type="button" onClick={clickHandler}>
      Load more
    </Btn>
  );
};

Button.propTypes = { clickHandler: PropTypes.func.isRequired };
