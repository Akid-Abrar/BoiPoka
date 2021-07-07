import React from 'react'
import Info from '../Books/books';
import {Form,FormControl,Button} from 'react-bootstrap'
const SearchArea =(props) =>
{

return(
    <div className="search-area">
    <Form inline onSubmit={props.searchbook} action="">
    <FormControl onChange={props.handlesearch} type="text" placeholder="Search for books" className="mr-sm-2" />
    
    <Button variant="outline-info" type="submit">
    Search</Button>
    </Form>
    </div>
)

}
 
export default SearchArea;