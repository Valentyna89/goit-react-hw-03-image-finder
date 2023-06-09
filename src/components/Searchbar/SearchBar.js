import { Component } from 'react';
import { TfiSearch } from 'react-icons/tfi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';

class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleInputChange = e => {
    this.setState({ searchQuery: e.target.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { searchQuery } = this.state;

    if (searchQuery.trim() === '') {
      return toast.error('Please enter search word!');
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <header className={css.Searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <input
            className={css.Input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchQuery"
            value={searchQuery}
            onChange={this.handleInputChange}
          />
          <button type="submit" className={css.Search_Btn}>
            <TfiSearch />
          </button>
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};

export default SearchBar;
