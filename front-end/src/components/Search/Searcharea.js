import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import Info from '../Books/books';
import "./Auto.css";
import axios from 'axios';
import * as ROUTES from '../../constants/routes';
import {Form,FormControl,Button,Fragment} from 'react-bootstrap'
const SearchArea =(props) =>
{
    
    const [searchtext, setSearchtext] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [resfound, setResfound] = useState(true);
  const [sug,setSug]= useState([]);
  
  const handlesug =() => {
      let s=[];
      axios.get("http://localhost:4000/books").then((res)=>
      {
          res.data.map((b,i)=>{
           s.push(b["name"]);
          })
          
          //console.log(s);
          setSug(s);
      }).catch(() => {
          alert("Data Unavailabe")
      })

  }
  const handleChange = (e) => {
     
    let searchval = e.target.value;
    let suggestion = [];
   
  
    if (searchval.length > 0) {
        suggestion =sug
        .sort()
        .filter((e) => e.toString().toLowerCase().includes(searchval.toLowerCase()));
      setResfound(suggestion.length !== 0 ? true : false);
    } 
    setSuggest(suggestion);
    setSearchtext(searchval);
  };

  const suggestedText = (value) => {
   // console.log(value);
    setSearchtext(value);
    console.log('val',searchtext);
    setSuggest([]);
  };

  const getSuggestions = () => {
    if (suggest.length === 0 && searchtext !== "" && !resfound) {
      return(
        <div class="no-suggestions">
          <em>No suggestions, you're on your own!</em>
        </div>
      );
    }
if(suggest.length >0){
    return (
      <ul class="suggestions">
        {suggest.map((item, index) => {
          return (
            <div key={index}>
              <li onClick={() => suggestedText(item)}>{item}</li>
              {index !== suggest.length - 1 && <hr />}
            </div>
          );
        })}
      </ul>
      
    );
}
    
  };

  const handleclick=() => (
    
    <Link to={ROUTES.INFO}></Link>
  );

return(
    <div className="search-area">
    {handlesug()}
    <Form inline  action="">
    <FormControl value={searchtext} onChange={handleChange}  type="text" placeholder="Search for books" className="mr-sm-2" />
    
    {getSuggestions()}
    
    
    </Form>
    <div className=".py-10" >
    
    
    <Link to={'./info/'+searchtext}>cccc </Link>
    
    </div>
    </div>
)

}
 
export default SearchArea;