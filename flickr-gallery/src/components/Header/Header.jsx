import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css'
import { API } from '../../store/middlewares/apiService'


class Header extends Component {

  onChangeTag(tag) {
    this.props.emptyCurrentPics();
    if (tag === 'Recent') this.props.fetchPictures();
    else this.props.fetchPicturesFromTag(tag, 1);
  }

  componentWillMount() {
    this.props.fetchTags();
    console.log(this.props.tags);
  }

  render() {
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
        <select id="categories" onChange={(e) => this.onChangeTag(e.target.value)}>>
          <option value="Recent">Recent</option>
          {this.props.tags && this.props.tags.map(tag => {
            return <option value={tag._content}>{tag._content}</option>
          })}
        </select>
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
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)