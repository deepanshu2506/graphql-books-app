import React, { Component } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { getAuthorsQuery, addBookMutation } from "./queries";
import { getBooksQuery } from "../bookList/queries";

class AddBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
  }

  populateAuthors = () => {
    const data = this.props.getAuthorsQuery;
    // console.log(data.authors);
    if (!data.loading) {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  updateChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ ...state });
  };

  submitForm = e => {
    e.preventDefault();
    const { name, genre, authorId } = this.state;
    this.props.addBookMutation({
      variables: { name, genre, authorId },
      refetchQueries: [{ query: getBooksQuery }]
    });
  };
  render() {
    return (
      <div className="add-books">
        <form id="add-book" onSubmit={this.submitForm}>
          <div className="field">
            <label>Book Name: </label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.updateChange}
            />
          </div>

          <div className="field">
            <label>genre: </label>
            <input
              type="text"
              name="genre"
              value={this.state.genre}
              onChange={this.updateChange}
            />
          </div>

          <div className="field">
            <label>Author: </label>
            <select name="authorId" onChange={this.updateChange}>
              <option value="">Select a Author</option>
              {this.populateAuthors()}
            </select>
          </div>
          <button>add</button>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBooks);
