import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params; //provided by router
    this.props.fetchPost(id);
  }

  render() {
    const { post } = this.props;

    if(!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/" className="btn btn-primary">Back Home</Link>
        <h3>{post.title}</h3>
        <h6>Catagories: {post.catagories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

//posts destructured from state
function mapStateToProps({ posts }, ownProps) {
  //ownProps are the props passed to the component. this way only the id for the post we want is passed in, not the full list
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost })(PostsShow);
//remeber fetchPost has to be in {} above, or will get error message theat it is not a fucntion!!
