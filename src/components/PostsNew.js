import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';//reduxForm is similar to connect function used in redux

class PostsNew extends Component {
  //need to pass field as arg as it has things like onchage etc
  //through redux-form
  //can add arbritary props on to field components, eg here label
  //which can be used to render the field
  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        {field.meta.error}
      </div>
    );
  }

  onSubmit(values) {
    console.log(values)
;  }

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
          name="catagories"
          label="Catagories"
          component={this.renderField}
        />
        <Field
          name="content"
          label="Blog Content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
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
  form: 'PostsNewForm'
})(PostsNew);

//giving reduxForm the name of the form - has to be unique string
