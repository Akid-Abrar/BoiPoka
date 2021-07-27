import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import Info from '../Books/books';
import "./Auto.css";

import axios from 'axios';

import * as ROUTES from '../../constants/routes';
import {Form,FormControl,Button,Fragment,Dropdown,Navbar, Nav} from 'react-bootstrap'
//const SearchArea =(props) =>
class SearchArea extends Component {
  constructor(props) {

      super(props);
      this.state = {
        searchtext:'',
        suggest:[],
        sug:[],
        auth:[],
      }
  }
//{
  
    
 /* const [searchtext, setSearchtext] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [resfound, setResfound] = useState(true);
  const [sug,setSug]= useState([]);
  const [auth,setAuth]= useState([]);*/
componentDidMount(){
  let s=[];
      
      axios.get("http://localhost:4000/books").then((res)=>
      {
          res.data.map((b,i)=>{
           s.push(b["name"]);
           
          })
          
          
         // setSug(s);
         this.setState({sug:s});
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
       // setAuth(authors);
       this.setState({auth:authors});
    }).catch(() => {
        console.log("Data Unavailabe for handleAuthor in searcharea")
    })

    
}
 
  
  
  
  handleChange = async(e) => {
     
    let searchval = e.target.value;
    let suggestion = [];
    let ausug=[];
    let bookid=[];
    let bookname=[];
    let newsugest=[];

   
    if (searchval.length > 0) {
     console.log('sug',this.state.sug);
        suggestion = this.state.sug
        .sort()
        .filter((e) => e.toString().toLowerCase().includes(searchval.toLowerCase()));
     
      console.log('auth',this.state.auth);
      ausug= this.state.auth
      .sort()
      .filter((e) => e.toString().toLowerCase().includes(searchval.toLowerCase()));
      //console.log(ausug);
      //auth theke books pabo
     ausug.map((a,i)=>{
      axios.get("http://localhost:4000/authors/authorname/" +a) .then((res) =>{
          
         res.data.map((bid,j)=>{
         // console.log('data',bid["books"]);
           bid["books"].map((bk,k)=>{
             bookid.push(bk);
           axios.get("http://localhost:4000/books/" +bk).then((response)=>{
           
              
             suggestion.push(response.data["name"]);
            
            
           });
            
    

           });
         });
       })
      })
     
     // setResfound(suggestion.length !== 0 ? true : false);
    
      
      
    } 
     
    
    //setSuggest(suggestion);
   
    //setSearchtext(searchval);
    this.setState({suggest:suggestion});
    //this.getSuggestions();
    this.setState({searchtext:searchval});

    
  };

   suggestedText = (value) => {
   // console.log(value);
   // setSearchtext(value);
   this.setState({searchtext:value});
    //this.state.searchtext);
   // setSuggest([]);
   this.setState({suggest:[]});
  };

   getSuggestions = () => {
     //console.log('inside getsugeston',this.state.suggest);
    if (this.state.suggest.length === 0 && this.state.searchtext !== "" ) {
      return(
        <div class="no-suggestions">
          <em>No suggestions, you're on your own!</em>
        </div>
      );
    }
  if(this.state.suggest.length >0){
    return (
      <div  style={ {backgroundColor:"#F0ECEC"}}>
      <ul class="suggestions">
      
        {this.state.suggest.map((item, index) => (
          
            <div key={index}>
            
              <li onClick={() =>this.suggestedText(item)}><font style = {{color:"black"}}>{item}</font></li>
              {index !== this.state.suggest.length - 1 && <hr />}
            </div>
          
        ))}
      </ul>
      </div>
      
    );
}
    
  };

  
render() {
return(
    <div className="search-area">
    
    
    <Form inline  action="">
    <FormControl value={this.state.searchtext} onChange={this.handleChange}  type="text" placeholder="Search for Books" className="mr-sm-2" />
    
    <Link to={'/info/'+this.state.searchtext}><i className="fas fa-search"></i> </Link>
    </Form>
    <div>{this.getSuggestions()}</div>
    
    </div>
)

}
}
 
export default SearchArea;