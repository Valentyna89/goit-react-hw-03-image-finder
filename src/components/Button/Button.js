import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onClick }) => (
  <div className={css.container_Btn}>
    <button type="button" className={css.LoadMore_Btn} onClick={onClick}>
      Load more
    </button>
  </div>
);

Button.propTypes = {
  onLoadMore: PropTypes.func,
};

export default Button;
