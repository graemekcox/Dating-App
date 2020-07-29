import React from 'react';
import {Link} from 'react-router-dom';

import {signout} from '../helpers/auth';

export default class Navbar extends React.Component {

    render (){
        return(
            <div>
                <nav class="navbar navbar-dark bg-dark box-shadow ">
                    <div class="navbar-brand  col-sm-3 col-md-2 mr-0 d-flex align-items-center">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart-half m-2" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 1.314C3.562-3.248-7.534 4.735 8 15V1.314z"/>
                            <path fillRule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                        </svg>
                        <a class="" href="/">
                            <strong>Dating App</strong>
                        </a>
                    </div>
                    <div class="btn-group m-r2">
                        <ul class="navbar-nav px-3">
                            <li class="nav-item text-nowrap">
                                <a class="nav-link" onClick={()=> signout()} href="#">Sign out</a>
                            </li>
                        </ul>
                        <button class="navbar-toggler" type="button" data-toggle="collapse">
                            <span class="navbar-toggler-icon"/>
                        </button>                    
                    </div>
                </nav> 
            </div>
        )
    }
}