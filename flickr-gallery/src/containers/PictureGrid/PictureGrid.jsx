import PropTypes from 'prop-types'
import React, { Component } from 'react';
import styled from 'styled-components';
import throttle from 'lodash.throttle';
import { connect } from 'react-redux';
import { fetchPictures, selectPicture, increasePageNum, fetchPicturesFromTag, fetchPicturesFromSearch } from '../../store/actions/actions'


import Picture from '../../components/Picture'
import PictureLoader from '../../components/PictureLoader';
import SelectedPicture from '../../components/SelectedPicture'

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
          this.props.fetchPicturesFromTag(this.props.selectedTag, this.props.pageNum)
          this.props.increasePageNum();
        } else if (this.props.searchValue) {
          this.props.fetchPicturesFromSearch(this.props.searchValue, this.props.pageNum);
          this.props.increasePageNum();
        } else {
          this.lazyFetchPictures();
        }
      }
    })
  }

  renderPictures = (pictures) => {

    const pictureLoaders = 5 // Number of loaders (blank images) at the end of the grid
    return [
      ...pictures.map(p => <Picture key={p.id} picture={p} handleClick={this.props.selectPicture} />),
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
    searchValue: state.pictures.searchValue,
    pageNum: state.pictures.pageNum,
    loading: state.pictures.loading
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPictures: () => dispatch(fetchPictures()),
  selectPicture: (picture) => dispatch(selectPicture(picture)),
  fetchPicturesFromTag: (tag, pageNum) => dispatch(fetchPicturesFromTag(tag, pageNum)),
  increasePageNum: () => dispatch(increasePageNum()),
  fetchPicturesFromSearch: (search, pageNum) => dispatch(fetchPicturesFromSearch(search, pageNum))
})

export default connect(mapStateToProps, mapDispatchToProps)(PictureGrid)