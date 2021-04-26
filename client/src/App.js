import React, { Component } from 'react';
import BookList from './components/BookList';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache
} from '@apollo/client';
import AddBook from './components/AddBook';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Ninja's Reading List</h1>
          <BookList></BookList>
          <AddBook></AddBook>
        </div>
      </ApolloProvider>
    )
  }
}


export default App;

