import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import {Footer} from 'react-bootstrap'

const FooterClass = () => (   
     
        <footer class="footer">
            <div class="container">
                <div class="row">             
                    <div class="col-4 col-sm-2">
                        <h5>Footer</h5>
                            <ul class="list-unstyled">
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
