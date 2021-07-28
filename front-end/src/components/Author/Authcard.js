import React, { Component } from 'react'
import { Image } from 'react-bootstrap';
import Followauth from '../Follow_author/FollowAuthor';

const Authcard = (props) => {
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <div className="card-title">

                        <center>
                        <h2 style={{ backgroundColor: "#925024" }}>
                            <font style={{ color: "#ebdb82d8" }}><b>About Author</b></font>
                        </h2>
                        </center>
                        <a href={`/authprofile/${props.userid}/${props.ownid}`}>
                            <h3 className="card-title">{props.fname}  {props.lname}</h3>
                        </a>
                        <br></br>
                        <center><Followauth val={props.val} handlefollow={props.handle} /></center>
                        <br></br>
                        <Image
                            height={100}
                            width={100}
                            roundedCircle
                            src={props.image}
                            alt="image"
                        />

                        <div className="card-text" style={{ backgroundColor: "#ebdb82d8" }}>{props.follow.length} Followers  </div>
                    </div>

                    <div className="card-text" style={{ backgroundColor: "#ebdb82d8" }}>{props.bio}  </div>



                </div>
            </div>

        </div>

    )

}
export default Authcard;