import React, { Component } from "react";
import { flowRight as compose } from 'lodash';
import { getAuthorsQuery, addBookMutation } from '../queries/queries';
import { graphql } from '@apollo/client/react/hoc';
import { useQuery, useMutation } from '@apollo/react-hooks';

class AddBook1 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            genre: '',
            authorID: ''
        };
    }
 //   const [addBookMut, { dataMutation }] = useQuery(addBookMutation);

    displayAuthors() {
        var data = this.props.getAuthorsQuery;
        console.log(this.props);
        if (data.loading) {
            return (<option disabled>Loading </option>);
        } else {
            return data.authors.map(author => {
                return (<option key={author.id} value={author.id}> {author.name}</option>);
            })
        }
    }



    submitForm(e) {
        e.preventDefault();

        console.log(this.state);
    }
    render() {
        return (
            <form id="add-book" onSubmit={this.submitForm.bind(this)} >
                <div className="field">
                    <label> Book Name : </label>
                    <input type="text" onChange={(e) => this.setState({ name: e.target.value })} />
                </div>

                <div className="fields">
                    <label> Genre : </label>
                    <input type="text" onChange={(e) => this.setState({ genre: e.target.value })} />
                </div>

                <div className="field">
                    <label> Author: </label>
                    <select onChange={(e) => this.setState({ authorID: e.target.value })} >
                        <option>Select Author</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button>Add Book</button>
            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook1);


