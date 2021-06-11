import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
// import {Footer} from 'react-bootstrap'

const FooterClass = () => (   
     
        <footer className="footer">
            <div className="container">
                <div className="row">             
                    <div className="col-4 col-sm-2">
                        <h5>Footer</h5>
                            <ul className="list-unstyled">
                              <li><a href="#">Home</a></li>
                              <li><a href="#">Menu</a></li>
                              <li><a href="#">Contact</a></li>
                            </ul>
                    </div>
                </div> 
            </div>
        </footer>
     
);

export default FooterClass;
