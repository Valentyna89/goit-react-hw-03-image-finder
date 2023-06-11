import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { ThreeCircles } from 'react-loader-spinner';
import SearchBar from './Searchbar';
import ImageGallery from './ImageGallery';
import getImages from '../services/api';
import Modal from './Modal';
import Button from './Button';
import css from './App.module.css';

class App extends Component {
  state = {
    searchQuery: '',
    hits: [],
    page: 1,
    perPage: 12,
    loading: false,
    largeImage: '',
    error: null,
    totalHits: '',
  };

  fetchGallery = () => {
    const { searchQuery, page, perPage } = this.state;
    this.setState({ loading: true });

    getImages(searchQuery, page, perPage)
      .then(({ hits, totalHits }) => {
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          totalHits: totalHits,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  showLoadMore = () => {
    const { totalHits, page, perPage } = this.state;
    return page < Math.ceil(totalHits / perPage);
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, hits: [], page: 1 });
    console.log('this.state: ', this.state);
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  handleOpenPicture = largeImage => {
    // console.log(largeImage);
    this.setState({ largeImage });
    this.toggleModal();
  };

  handleLoadMoreBtnClick = async () => {
    // console.log(this.state.page);
    await this.setState(prevState => ({ page: prevState.page + 1 }));
    this.fetchGallery();
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    if (prevQuery !== nextQuery) {
      this.fetchGallery();
    }
  }
  render() {
    const { hits, loading, showModal, largeImage } = this.state;
    const showLoadMore = this.showLoadMore();

    return (
      <div>
        <SearchBar onSubmit={this.handleFormSubmit} />

        {hits.length > 0 && (
          <ImageGallery hits={hits} openImage={this.handleOpenPicture} />
        )}

        {loading && (
          <div className={css.Spiner}>
            <ThreeCircles
              height="100"
              width="100"
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />
          </div>
        )}

        {hits.length !== 0 && !loading && showLoadMore && (
          <Button onClick={this.handleLoadMoreBtnClick} />
        )}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImage} alt={largeImage} />
          </Modal>
        )}

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
