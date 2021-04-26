import React, { useState} from "react";
//import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';
import { graphql } from '@apollo/client/react/hoc';
import { flowRight as compose } from 'lodash';

function AddBook(props) {

    const [name, setname] = useState("");
    const [genre, setgenre] = useState("");
    const [authorID, setauthorID] = useState("");


    //const { loading, error, data } = useQuery(getAuthorsQuery);
    //const [addBookMut, { dataMutation }] = useMutation(addBookMutation);

    function displayAuthors() {
        var data = props.getAuthorsQuery;
        if (data.loading) {
            return (<option disabled>Loading </option>);
        } else {
            return data.authors.map(author => (<option key={author.id} value={author.id}> {author.name}</option>))
        }
    }



    const submitForm = (e) => {
        e.preventDefault();
        const newBook = { name: name, genre: genre, authorID: authorID };
        console.log(newBook);

        /*addBookMut({
            variables: { name: name, genre: genre, authorID: authorID },
        });
        */
        props.addBookMutation(
            {
                variables: {
                    name: name,
                    genre: genre,
                    authorID: authorID
                },
                refetchQueries : [{query:getBooksQuery}]
            }
        );
    }

    return (
        <form id="add-book" onSubmit={submitForm} >
            <div className="field">
                <label> Book Name : </label>
                <input type="text" onChange={(e) => setname(e.target.value)} />
            </div>

            <div className="field">
                <label> Genre : </label>
                <input type="text" onChange={(e) => setgenre(e.target.value)} />
            </div>

            <div className="field">
                <label> Author: </label>
                <select onChange={(e) => setauthorID(e.target.value)} >
                    <option>Select Author</option>
                    {displayAuthors()}
                </select>
            </div>
            <button>Add Book</button>
        </form>

    );
};

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);



