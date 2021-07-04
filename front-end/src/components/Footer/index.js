import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import * as ROUTES from '../../constants/routes';
// import {Footer} from 'react-bootstrap'

const FooterClass = () => (   
     
        <footer className="footer">
            <div className="container">
                <div className="row justify-content-center" >             
                    <div className="col-4 col-sm-2">
                        <ul className="list-unstyled">
                            <li><a href={ROUTES.HOME}>Home</a></li>
                            <li><a href={ROUTES.READER}>Profile</a></li>
                            <li><a href={ROUTES.ACCOUNT}>Account</a></li>
                        </ul>
                    </div>
                </div> 
                <div class="row justify-content-center">             
                    <div class="col-auto">
                        <p><font color="white" size="4">© Copyright BoiPoka Team</font></p>
                    </div>
                </div>
            </div>
        </footer>
     
);

export default FooterClass;
