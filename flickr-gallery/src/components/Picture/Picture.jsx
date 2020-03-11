import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css'

import PropTypes from 'prop-types';
import { addToFavorites, removeFromFavorites } from '../../store/actions/actions';
import { getAvailableSize } from '../../utils/pictures';

const iconRed = require('../../assets/Icon-Favorite-Red.png');
const iconBlack = require('../../assets/Icon-Favorite-Black.png');

class Picture extends Component {
  static propTypes = {
    picture: PropTypes.shape({
      ownerInfo: PropTypes.shape({
        profile: PropTypes.shape({
          first_name: PropTypes.string,
          last_name: PropTypes.string,
          id: PropTypes.string
        })
      })
    }),
    handleClick: PropTypes.func.isRequired
  };

  addToFavorites (id) {
    this.props.addToFavorites(id);
  }

  removeFromFavorites (id) {
    this.props.removeFromFavorites(id);
  }

  render () {
    const { picture, handleClick } = this.props,
      { first_name: name, last_name: surname,
        id } = picture.ownerInfo.profile

    return (

      <div>
        <div className="Picture" onClick={() => handleClick(picture)}>
          <img src={getAvailableSize(picture)} alt={picture.title || 'Picture title'} />
          <div className="Picture__img-mask">
            <h2 className="Picture__title">
              {picture.title || 'Untitled'} <br /> <br />
              <span>By {`${name || id} ${surname || ''}`}</span>
            </h2>
          </div>
        </div>
        {
          this.props.favorited.includes(id) ? <a onClick={() => this.removeFromFavorites(id)}><img className="favorite" src={iconRed} alt="" /></a> :
            <a href="http://localhost:8080/auth/flickr" ><img className="favorite" src={iconBlack} alt="" /></a>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    favorited: state.picture.favorited
  }
}

const mapDispatchToProps = dispatch => ({
  addToFavorites: (id) => dispatch(addToFavorites(id)),
  removeFromFavorites: (id) => dispatch(removeFromFavorites(id))
})


export default connect(mapStateToProps, mapDispatchToProps)(Picture)