import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css'
import { API } from '../../store/middlewares/apiService'
import throttle from 'lodash.throttle';



class Header extends Component {

  onChangeTag (tag) {
    this.props.emptyCurrentPics();
    if (tag === 'Recent') this.props.fetchPictures();
    else this.props.fetchPicturesFromTag(tag, 1);
  }

  onSearch(search) {
    this.props.emptyCurrentPics();
    if (search === '') this.props.fetchPictures();
    else {
      this.props.fetchPicturesFromSearch(search, 1);
    }
  }

  componentWillMount () {
    this.props.fetchTags();
  }

  render () {
    return (
      <div className="Header">
        <h1>flickr Gallery</h1>
        <h3>Explore recent pictures uploaded to
        <a href="https://www.flickr.com/"> flickr</a>, <br />
          from everywhere in the world.</h3>
        <p>Made by <a href="https://www.linkedin.com/in/jonportella/">Jon Portella</a>.<br />
          Front end made with <a href="https://reactjs.org/">React</a> and
        <a href="https://redux.js.org/"> Redux</a>.
        Back end made with <a href="https://koajs.com/">Koa</a>.
        Content from <a href="https://www.flickr.com/services/api/">flickr API.</a></p>
        <br />
        <select id="categories" onChange={(e) => this.onChangeTag(e.target.value)}>>
          <option className="options" value="Recent">recent</option>
          {this.props.tags && this.props.tags.map(tag => {
            return <option value={tag._content}>tag - {tag._content}</option>
          })}
        </select><br /><br />
        <input type="text" placeholder="Search..." value={this.props.searchValue}></input>
        <button></button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.pictures.tags,
    picturesFromTag: state.pictures.picturesFromTag,
    pictures: state.pictures.pictureList,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPictures: () => dispatch({
    type: 'FETCH_PICTURES',
    [API]: {
      path: '/pictures'
    }
  }),
  fetchTags: () => dispatch({
    type: 'FETCH_TAGS',
    [API]: {
      path: '/tags'
    }
  }),
  emptyCurrentPics: () => dispatch({
    type: 'EMPTY_CURRENT_PICS'
  }),
  fetchPicturesFromTag: (tag, pageNum) => dispatch({
    type: 'FETCH_PICTURES_FROM_TAG',
    [API]: {
      path: '/pictures-from-tags/:' + tag + '/:' + pageNum,
    },
    tag: tag
  }),
  fetchPicturesFromSearch: (search, pageNum) => dispatch({
    type: 'FETCH_PICTURES_FROM_SEARCH',
    [API]: {
      path: '/pictures-from-search/:' + search + '/:' + pageNum,
    },
    searchValue: search
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)