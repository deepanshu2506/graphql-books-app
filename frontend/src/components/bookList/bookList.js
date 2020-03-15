import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "./queries";
import BookDetails from "../bookDetails/bookDetails";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: "" };
  }

  displayBooks = () => {
    const data = this.props.data;
    // console.log(data.books);
    if (data.loading) {
      return <div>Loading Books</div>;
    } else {
      return data.books.map(book => {
        return (
          <li
            onClick={e => {
              this.setState({ selected: book.id });
            }}
            key={book.id}
          >
            {book.name}
          </li>
        );
      });
    }
  };

  render() {
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
