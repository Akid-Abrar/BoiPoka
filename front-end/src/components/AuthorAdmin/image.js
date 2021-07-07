import { useState } from 'react';
import React from 'react'
import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage'
import axios from 'axios';
import {Form,Button,Row,Col} from 'react-bootstrap'


function Upload(props) {
	const storage = firebase.storage();
	const [image, setImage] = useState('');
	var imageurl = {};
	const upload = () => {
		if (image == null)
			return;
		var uploadTask=storage.ref().child(`/Author/images/${props.id}.${image.name}`).put(image);

		uploadTask.on('state_changed',
			(snapshot) => {
			},
			(error) => {
				// error function ....
				console.log(error);
			},
			() => {
				// complete function ....
				storage.ref().child(`/Author/images/${props.id}.${image.name}`).getDownloadURL().then(url => {
					 console.log(url);
					imageurl=url;
					// this.setState({ url });
					const author={
						image:imageurl
					};
					console.log("author",author);
		
					
						axios.patch('http://localhost:4000/authors/image/' + props.id, author).then((response) => {
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
			<Form>
  				<Form.Group>
					<Row>
						<Col sm={8}><Form.File id="exampleFormControlFile1" onChange={(e) => { setImage(e.target.files[0])}}/></Col>
						<Col sm={4}><Button variant="primary" size="sm" className="mr-2" onClick={upload}>Upload</Button></Col>
					</Row>
  				</Form.Group>
			</Form>
		</div>
	);
}

export default Upload;
