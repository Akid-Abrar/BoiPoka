import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import Info from '../Books/books';
import "./Auto.css";

import axios from 'axios';

import * as ROUTES from '../../constants/routes';
import {Form,FormControl,Button,Fragment,Dropdown} from 'react-bootstrap'
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
          alert("Data Unavailabe")
      })
     
  
  }

  const handleauthor =() => {
    
    let authors=[];
    axios.get("http://localhost:4000/authors").then((res)=>
    {
        res.data.map((b,i)=>{
        
            authors.push(b["first_name"]);
           

        })
        
        
        
        
       // console.log(authors);
        setAuth(authors);
    }).catch(() => {
        alert("Data Unavailabe")
    })
  }
  const handleChange = (e) => {
     
    let searchval = e.target.value;
    let suggestion = [];
    let ausug=[];
    let bookid=[];
    let bookname=[];
    let newsugest=[];
  
    if (searchval.length > 0) {
        suggestion = sug
        .sort()
        .filter((e) => e.toString().toLowerCase().includes(searchval.toLowerCase()));
      setResfound(suggestion.length !== 0 ? true : false); 
      ausug= auth
      .sort()
      .filter((e) => e.toString().toLowerCase().includes(searchval.toLowerCase()));
      //console.log(ausug);
      //auth theke books pabo
      ausug.map((a,i)=>{
        axios.get("http://localhost:4000/authors/authorname/" +a).then((res)=>{
          
         res.data.map((bid,j)=>{
         // console.log('data',bid["books"]);
           bid["books"].map((bk,k)=>{
             bookid.push(bk);
             axios.get("http://localhost:4000/books/" +bk).then((res)=>{
           
              //bookname.push(res.data["name"]);
             console.log(res.data["name"]);
             suggestion.push(res.data["name"]);
             
           })

              //now book id theke book name
    /* bookid.map((b,i)=>{
        axios.get("http://localhost:4000/books/" +b).then((res)=>{
           
           bookname.push(res.data["name"]);
          
          
        })
        console.log('upore',bookname);
      
      })*/

           })
         })
        })
      })
     
      
    
      
      
    } 
      // console.log(bookname);
    
    
    
  // newsugest = [].concat(suggestion, bookname);
    //console.log('final sugestion',newsugest);
    
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
    {handlesug()}
    {handleauthor()}
    <Form inline  action="">
    <FormControl value={searchtext} onChange={handleChange}  type="text" placeholder="Search for books" className="mr-sm-2" />
    </Form>
    {getSuggestions()}
    
    <Link to={'./info/'+searchtext}> <i className="fas fa-search"></i> </Link>
    
    
    </div>
)

}
 
export default SearchArea;