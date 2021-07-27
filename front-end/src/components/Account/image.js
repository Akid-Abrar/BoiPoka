import { useState } from 'react';
import React from 'react'
import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage'
import axios from 'axios';
import {Container,Row,Col,Button,Card,Image} from 'react-bootstrap'



function Upload(props) {
	const storage = firebase.storage();
	const [image, setImage] = useState('');
	var imageurl = {};
	const upload = () => {
		if (image == null)
			return;
		var uploadTask=storage.ref().child(`/User/images/${props.id}.${image.name}`).put(image);

		uploadTask.on('state_changed',
			(snapshot) => {
			},
			(error) => {
				// error function ....
				console.log(error);
			},
			() => {
				// complete function ....
				storage.ref().child(`/User/images/${props.id}.${image.name}`).getDownloadURL().then(url => {
					// console.log(url);
					imageurl=url;
					// this.setState({ url });
					const reader={
						image:imageurl
					};
		
					axios.get('http://localhost:4000/readers/email/' + props.id).then((response) => {
						//console.log("id",response.data[0]._id);
						axios.patch('http://localhost:4000/readers/' + response.data[0]._id, reader).then((response) => {
						// console.log("wishlist");
						 //console.log("patch",response);
			 
					 }).catch((err) => {
						 alert("not valid data")
					 })
			 
					 }).catch((err) => {
						 alert("not valid data")
					 })
				})
			});
	}

	return (
		<div>
			<center>
				<Card style={{ width: '15rem' , height : '9rem' , backgroundColor:"#d1ecf0d8" ,  border:"0px"}}>
				<Card.Header><h4>Upload Image</h4></Card.Header>
				<Card.Header>
					<input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
				</Card.Header>
				<Card.Body>
					<Button variant="secondary" onClick={upload} >Upload</Button>
				</Card.Body>
				</Card>
			</center>
		</div>
	);
}

export default Upload;
