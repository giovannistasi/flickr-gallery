import './styles.css'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPictures, fetchPicturesFromTag, fetchPicturesFromSearch, fetchTags, emptyCurrentPics } from '../../store/actions/actions'

class Header extends Component {

  state = {
    searchInput: ''
  }

  onChangeTag (tag) {
    this.props.emptyCurrentPics();
    if (tag === 'Recent') this.props.fetchPictures();
    else this.props.fetchPicturesFromTag(tag, 1);
  }

  componentWillMount () {
    this.props.fetchTags();
  }

  submitForm = e => {
    e.preventDefault();
    this.props.emptyCurrentPics();
    if (this.state.searchInput === '') return;
    else {
      this.props.fetchPicturesFromSearch(this.state.searchInput, 1);
    }
    this.setState({ searchInput: '' })
  };

  render () {
    return (
      <div className="Header">
        <a href="http://localhost:8080/auth/flickr" ><img className="favorite" alt="" />LOGIN</a>
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
        <div className="tag-and-search">

          <div>
            <select className="input-group" onChange={(e) => this.onChangeTag(e.target.value)}>
              <option value="" disabled selected>Select Tag</option>
              <option className="options" value="Recent">recent</option>
              {this.props.tags && this.props.tags.map(tag => {
                return <option value={tag._content}>{tag._content}</option>
              })}
            </select>
          </div>
          <form onSubmit={this.submitForm}>
            <input
              className="search"
              placeholder="Search..."
              type="text"
              value={this.state.searchInput}
              onChange={(e) => { this.setState({ searchInput: e.target.value }) }}
              required
            />
            <button type="submit" />
          </form>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  console.log(state);

  return {
    pictures: state.pictures.pictureList,
    picturesFromTag: state.pictures.picturesFromTag,
    tags: state.pictures.tags,
  }
}

const mapDispatchToProps = dispatch => ({
  emptyCurrentPics: () => dispatch(emptyCurrentPics()),
  fetchPictures: () => dispatch(fetchPictures()),
  fetchPicturesFromSearch: (search, pageNum) => dispatch(fetchPicturesFromSearch(search, pageNum)),
  fetchPicturesFromTag: (tag, pageNum) => dispatch(fetchPicturesFromTag(tag, pageNum)),
  fetchTags: () => dispatch(fetchTags())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)