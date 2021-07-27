import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import Info from '../Books/books';
import "./Auto.css";

import axios from 'axios';

import * as ROUTES from '../../constants/routes';
import {Form,FormControl,Button,Fragment,Dropdown,Navbar, Nav} from 'react-bootstrap'
const SearchArea =(props) =>
{
  
    
  const [searchtext, setSearchtext] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [resfound, setResfound] = useState(true);
  const [sug,setSug]= useState([]);
  const [auth,setAuth]= useState([]);
  
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
          console.log("Data Unavailabe in handlesug in searcharea")
      });

      let authors=[];
    axios.get("http://localhost:4000/authors").then((res)=>
    {
        res.data.map((b,i)=>{
        
            authors.push(b["first_name"]);
           
        })
       // console.log(authors);
        setAuth(authors);
    }).catch(() => {
        console.log("Data Unavailabe for handleAuthor in searcharea")
    })
  }

  
  const handleChange = async(e) => {
     
    let searchval = e.target.value;
    let suggestion = [];
    let ausug=[];
    let bookid=[];
    let bookname=[];
    let newsugest=[];

   
    if (searchval.length > 0) {
     console.log('sug',sug);
        suggestion = sug
        .sort()
        .filter((e) => e.toString().toLowerCase().includes(searchval.toLowerCase()));
     
      console.log('auth',auth);
      ausug= auth
      .sort()
      .filter((e) => e.toString().toLowerCase().includes(searchval.toLowerCase()));
      //console.log(ausug);
      //auth theke books pabo
     await ausug.map((a,i)=>{
      axios.get("http://localhost:4000/authors/authorname/" +a) .then((res) =>{
          
         res.data.map((bid,j)=>{
         // console.log('data',bid["books"]);
           bid["books"].map((bk,k)=>{
             bookid.push(bk);
           axios.get("http://localhost:4000/books/" +bk).then((response)=>{
           
              //bookname.push(res.data["name"]);
             console.log(response.data["name"]);
             suggestion.push(response.data["name"]);
            
           });
            
    

           });
         });
       })
      })
     
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
      <div className="suggestions" style={ {backgroundColor:"#F0ECEC"}}>
      <ul class="suggestions">
        {suggest.map((item, index) => {
          return (
            <div key={index}>
              <li onClick={() => suggestedText(item)}><font style = {{color:"black"}}>{item}</font></li>
              {index !== suggest.length - 1 && <hr />}
            </div>
          );
        })}
      </ul>
      </div>
      
    );
}
    
  };

  const handleSearch = (searchType) => {
    if (searchType) {
      // search with type (Author or Book)
      //doSearch({ keyword, type })
    } else {
      // search with keyword only
     // doSearch({ keyword })
    }
  }
 

return(
    <div className="search-area">
    {searchtext !== "" ? handlesug()
    : null}
    
    <Form inline  action="">
    <FormControl value={searchtext} onChange={handleChange}  type="text" placeholder="Search for Books" className="mr-sm-2" />
    
    <Link to={'/info/'+searchtext}><i className="fas fa-search"></i> </Link>
    </Form>
    <div>{getSuggestions()}</div>
    
    </div>
)

}
 
export default SearchArea;