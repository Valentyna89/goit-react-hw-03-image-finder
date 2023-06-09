import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    showModal: false,
    selectedPicture: null,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  selectPicture = link => {
    this.setState({ selectedPicture: link });
    this.toggleModal();
  };

  render() {
    const { hits } = this.props;
    const { showModal, selectedPicture } = this.state;

    return (
      <>
        <ul className={css.ImageGallery}>
          {hits.map(({ id, webformatURL, largeImageURL }) => (
            <li key={id}>
              <ImageGalleryItem
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                handleClick={this.selectPicture}
              />
            </li>
          ))}
        </ul>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={selectedPicture} alt={'pic preview'} />
          </Modal>
        )}
      </>
    );
  }
}
ImageGallery.protoType = {
  searchQuery: PropTypes.string,
};

export default ImageGallery;
