const graphql = require('graphql');
const _ = require('lodash');

const Book = require('../models/book');
const Author = require('../models/author');
/*
var books = [
    { name: 'Wings of fire', gerne: 'fantasy', id: '1', authorID: '1' },
    { name: 'Harry Potter', gerne: 'fantasy', id: '2', authorID: '1' },
    { name: 'Dawn of fire', gerne: 'fantasy', id: '1', authorID: '2' },
    { name: 'Lord Of The Rings', gerne: 'fantasy', id: '2', authorID: '2' },
    { name: 'Superman Comics', gerne: 'fantasy', id: '1', authorID: '3' },
    { name: 'Hellen Keller', gerne: 'fantasy', id: '2', authorID: '3' }
];

var authors = [
    { name: 'Rythm Talaycha', age: '12', id: '1' },
    { name: 'Kanak Talaycha', age: '22', id: '2' },
    { name: 'Naman Talaycha', age: '24', id: '3' },
];
*/
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
    name: 'Book',
    fields: () => ({// always to wrap the fields inside the arrow function
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                //   return _.find(authors, { id: parent.authorID });
                return Author.findById(parent.authorID);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({  // always to wrap the fields inside the arrow function
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: graphql.GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //console.log(parent.id);
                //   return _.filter(books, { authorID: parent.id })
                return Book.find({ authorID: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                console.log("book " + args.id);
                //code to get data from db / other source
                //  return _.find(books, { id: args.id });
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                console.log("author " + args.id);
                //   return _.find(authors, { id: args.id });
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //  return books;
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                //   return authors;
                return Author.find({});
            }
        }
    }
});


//mutation help us in store the data in the database
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }

            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorID: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorID: args.authorID
                });
                return book.save();
            }
        }
    }
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});