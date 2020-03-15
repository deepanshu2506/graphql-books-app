import React, { Component } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { getBookQuery } from "./queries";

class BookDetails extends Component {
  constructor(props) {
    super(props);
  }
  displayBookDetails = () => {
    const { book } = this.props.getBookDetails;
    // console.log(book);
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>ALL BOOKS BY AUTHOR</p>
          <ul className="other-books">
            {book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No Book Selected..</div>;
    }
  };
  render() {
    return <div className="book-details">{this.displayBookDetails()}</div>;
  }
}

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  },
  name: "getBookDetails"
})(BookDetails);
