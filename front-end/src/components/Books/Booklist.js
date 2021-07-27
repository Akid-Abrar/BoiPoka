import React, { Component } from 'react'
import Bookcard from './Bookcard';

const Booklist = (props) => {
    return (
        <div className='list'>
            {
                
                props.books.map((book, i) => {
                 return <Bookcard 
                 key={i}
                 avg_rating={book["avg_rating"]}
                 genre={book["genre"]}
                 des={book["description"]}
                 nam={book["name"]}
                 bookimage={book["bookimage"]}
                 wish={props.handlewish}
                 val={props.val}
                 />
                })
            }
        </div>
    )

}
export default Booklist;