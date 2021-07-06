import { useState } from 'react';
import React from 'react'
import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage'
import axios from 'axios';



function Upload(props) {
	const storage = firebase.storage();
	const [image, setImage] = useState('');
	var imageurl = {};
	const upload = () => {
		if (image == null)
			return;
		var uploadTask=storage.ref().child(`/Book/images/${props.id}.${image.name}`).put(image);

		uploadTask.on('state_changed',
			(snapshot) => {
			},
			(error) => {
				// error function ....
				console.log(error);
			},
			() => {
				// complete function ....
				storage.ref().child(`/Book/images/${props.id}.${image.name}`).getDownloadURL().then(url => {
					 console.log(url);
					imageurl=url;
					// this.setState({ url });
					const book={
						bookimage:imageurl
					};
					console.log("book",book);
		
					
						axios.patch('http://localhost:4000/books/image/' + props.id, book).then((response) => {
						// console.log("wishlist");
						 console.log("patch",response);
			 
					 }).catch((err) => {
						 alert("not valid data")
					 })
			 
					 
				})
			});

			

			



	}

	return (
		<div>
			<center>
				<input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
				<button onClick={upload}>Upload</button>
			</center>
		</div>
	);
}

export default Upload;
