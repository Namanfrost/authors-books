//import { useQuery } from '@apollo/client';
import React from 'react'
import { getBookQuery } from '../queries/queries';
//mport { graphql } from '@apollo/client/react/hoc';
import { useQuery } from '@apollo/client';
import '../index.css';

function BookDetails({ bookId }) {

    const { loading, error, data } = useQuery(getBookQuery, {
        variables: { id: bookId },
    });
    if (loading) return null;
    if (error) return `Error! ${error}`;

    function displayBookDetails() {
     //   console.log({ bookId });
       // console.log(data);
        const { book } = data;

        if (book) {
            return (
                <div id="other-books">
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>Author Name : {book.author.name}</p>
                    <ul  >{book.author.books.map(sbook =>  {
                            return (
                                <div>
                                    <li key={sbook.name} > {sbook.name} </li>
                                </div>
                            );
                        }
                        )
                    }</ul>
                </div>
            );
        } else {
            return (<div>no book selected</div>)
        }
    }
    return (
        <div id="book-details">
            { displayBookDetails()}
        </div>
    )
}

export default BookDetails;


