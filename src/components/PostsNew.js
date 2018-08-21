import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';//reduxForm is similar to connect function used in redux
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';

class PostsNew extends Component {
  //need to pass field as arg as it has things like onchage etc
  //through redux-form
  //can add arbritary props on to field components, eg here label
  //which can be used to render the field
  renderField(field) {
    const { meta: { touched, error } } = field //destructuring meta, and nested props of touched and error from meta
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
          {/* destructured as above. actually field.meta.touched and field.meta.error */}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    //need to call an action creator, api request in action creator
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
    //navigate user back to "/" on success of post
    //this.props.history.push("route name") will acieve this, but won't wait on ajax call
    //put in callback as above. put promise in action creator

  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name="title"
          label="Blog Title"
          component={this.renderField}
        />
        <Field
          name="categories"
          label="Categories"
          component={this.renderField}
        />
        <Field
          name="content"
          label="Blog Content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

//takes values as arg, this is the content of the input into forms
function validate(values) {
  const errors = {};

  //name in validate function has to be the same as the name prop of the field
  //if there is no value.title info, show the error message
  if(!values.title) {
    errors.title = "Enter a title"
  }
  if(!values.catagories) {
    errors.catagories = "Enter some catagories"
  }
  if(!values.content) {
    errors.content = "Please add some content"
  }

  //if errors is empty, redux form assumes no errors and good to submit
  //if errors has any properties, redux form assumes form is invalis and won't submit
  return errors;
}

export default reduxForm({
  //key and function name are same, so condensd to validate
  validate,
  //giving reduxForm the name of the form - has to be unique string
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
