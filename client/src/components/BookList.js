import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
//import DisplayBooks from './DisplayBooks'
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails'


function BookList() {
    const { loading, error, data } = useQuery(getBooksQuery);
    const [selected, setSelected] = useState(null);
    if (loading) return <p>Loading...</p>;
    else if (error) return <p>Error :(</p>;

    return (
        <div className="books">
            <ul id="book-list">
                {data.books.map(book => {
                    return (
                        <li key={book.id} onClick={(e) => setSelected(book.id)}> {book.name} </li>
                    );
                })}
            </ul>
            <BookDetails bookId={selected}></BookDetails>
        </div>
    )
}

export default BookList;

