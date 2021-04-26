import { gql } from '@apollo/client';

const getBooksQuery = gql`
    {
        books{
            name
            genre
            id
        }
    }
`;

const getAuthorsQuery = gql`
    {
        authors{
            name
            age
            id
        }
    }
`;

const addBookMutation = gql`

mutation($name:String!,$genre: String! ,$authorID : ID! ){
    addBook(name : $name , genre:$genre ,authorID:$authorID){
        name
        genre
        id
    }
}
`


const getBookQuery = gql`
    query($id: ID ){
        book(id:$id){
            name
            genre
            id
            author{
                name
                age 
                id 
                books{
                    name
                    genre
                    id
                }
            }
        }
    }
`

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery};