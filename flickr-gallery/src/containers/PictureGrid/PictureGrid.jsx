import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import throttle from 'lodash.throttle';

import { API } from '../../store/middlewares/apiService'

import Picture from '../../components/Picture'
import SelectedPicture from '../../components/SelectedPicture'
import PictureLoader from '../../components/PictureLoader';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  row-gap: 5vmin;
  column-gap:5vim;
  justify-items: center;
  width:100%;
  margin: 5vmin 0;
  `

class PictureGrid extends Component {
  static propTypes = {
    pictures: PropTypes.array,
    selectedPicture: PropTypes.object,
    fetchPictures: PropTypes.func.isRequired,
    selectPicture: PropTypes.func.isRequired,
  };

  pageNumber;

  componentWillMount () {
    // Initial two calls to server
    this.props.fetchPictures()
    this.props.fetchPictures()
    //throttle method to avoid unnecesary calls to server
    this.lazyFetchPictures = throttle(this.props.fetchPictures, 500)

    this.listenForScrollAndFetch() // From this point on, only fetch on scroll
  }

  // fetch new pictures when scrolled almost till the bottom
  listenForScrollAndFetch = () => {
    window.addEventListener('scroll', (e) => {
      const isLoading = this.props.loading;
      const scrollAfterTreshold = window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - window.innerHeight / 0.5;
      if (!isLoading && scrollAfterTreshold) {
        if (this.props.selectedTag) {
          // throttle(() => {
          this.props.fetchPicturesFromTag(this.props.selectedTag, this.props.pageNum)
          this.props.increasePageNum();
          // }, 500
          // )
        } else {
          console.log(this.props.selectedTag);
          this.lazyFetchPictures();
        }
      }
    })
  }

  renderPictures = (pictures) => {

    const pictureLoaders = 5 // Number of loaders (blank images) at the end of the grid
    return [
      ...pictures.map(p => <Picture key={p.id} picture={p} handleClick={this.selectPicture} />),
      this.renderPictureLoaders(pictureLoaders)
    ]
  }

  renderPictureLoaders = (num) => {
    // Calculate the opacity for each loader so it results in a nice scaling down grayscale
    let res = []
    const step = 1 / num;
    for (let i = 1; i <= num; i++) {
      let opacity = step * i
      if (opacity === 1) opacity -= 0.1 // We don't want opacity === 1, too bright!
      res.push(opacity)
    }
    return res.reverse().map(n => <PictureLoader opacity={n.toFixed(1)} key={n} />)
  }

  selectPicture = (picture) => {
    this.props.selectPicture(picture)
  }

  render () {
    const { pictures, selectedPicture } = this.props;


    return (
      <Container>
        {pictures && this.renderPictures(pictures)}
        {selectedPicture &&
          <SelectedPicture selectedPicture={selectedPicture}
            handleClick={this.selectPicture} />}
      </Container>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    pictures: state.pictures.pictureList,
    selectedPicture: state.pictures.selectedPicture,
    selectedTag: state.pictures.selectedTag,
    pageNum: state.pictures.pageNum,
    loading: state.pictures.loading
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPictures: () => dispatch({
    type: 'FETCH_PICTURES',
    [API]: {
      path: '/pictures'
    }
  }),
  selectPicture: (picture) => dispatch({
    type: 'SELECT_PICTURE',
    data: picture
  }),
  fetchPicturesFromTag: (tag, pageNum) => dispatch({
    type: 'FETCH_PICTURES_FROM_TAG',
    [API]: {
      path: '/pictures-from-tags/:' + tag + '/:' + pageNum,
    }
  }),
  increasePageNum: () => dispatch({
    type: 'INCREASE_PAGE_NUM'
  })
})

// const mapDispatchToProps = {
//   fetchPictures, selectPicture
// }

// function fetchPictures() {
//   return {
//     type: 'FETCH_PICTURES',
//     [API]: {
//       path: '/pictures'
//     }
//   }
// }

export default connect(mapStateToProps, mapDispatchToProps)(PictureGrid)