const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/Books");
const Author = require("../models/Author");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    genre: {
      type: GraphQLString
    },
    author: {
      type: authorType,
      async resolve(parent, args) {
        // return _.find(authors,{id:parent.authorId});
        return await Author.findById(parent.authorId);
      }
    }
  })
});

const authorType = new GraphQLObjectType({
  name: "author",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        // return _.filter(books , {authorId:parent.id})
        return await Book.find({
          authorId: parent.id
        });
      }
    }
  })
});

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      async resolve(parent, args) {
        return await Book.findById(args.id);
      }
    },
    author: {
      type: authorType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      async resolve(parent, args) {
        // return _.find(authors , {id:args.id})
        return await Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        return await Book.find();
      }
    },
    authors: {
      type: new GraphQLList(authorType),
      async resolve(parent, args) {
        return await Book.find();
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    addAuthor: {
      type: authorType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      async resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return await author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        genre: {
          type: new GraphQLNonNull(GraphQLString)
        },
        authorId: {
          type: GraphQLID
        }
      },
      async resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });

        return await book.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: Mutation
});
