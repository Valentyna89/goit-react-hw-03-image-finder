import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {};
  render() {
    const { largeImageURL, webformatURL, handleClick } = this.props;

    return (
      <img
        src={webformatURL}
        alt="description-info"
        className={css.ImageGalleryItemImage}
        onClick={() => handleClick(largeImageURL)}
      />
    );
  }
}

ImageGalleryItem.protoType = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  handleClick: PropTypes.func,
};

export default ImageGalleryItem;
