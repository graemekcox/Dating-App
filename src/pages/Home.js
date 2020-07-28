import React from 'react';
import {Link} from 'react-router-dom';

export default class Home extends React.Component {
    render (){
        return(
            <div class="container-fluid">
                <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light container-flu">
                    <div class="col-md-5 p-lg-5 mx-auto my-5 text-center">
                        <h1 class="display-4 font-weight-normal"> Welcome</h1>
                        <p class="lead font-weight-normal">
                            Create an account to join a network of 0 potential mates
                        </p>
                        <Link class="btn btn-lg btn-primary" to='/signup'>Click here to signup!</Link>
                    </div>

                </div>
            </div>
        )
    }
}