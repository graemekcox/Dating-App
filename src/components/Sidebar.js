import React from 'react';
import {Link} from 'react-router-dom';
import {FiSearch, FiMessageCircle, FiSettings,FiHelpCircle} from "react-icons/fi";

export default class Sidebar extends React.Component {
    render (){
        return(
            <div>
                <nav id="sidebar" class="active">
                    {/* <FaTwitter/> */}
                    <div class="sidebar-sticky">
                        <ul class="list-unstyled components mb-5">
                            <li class="nav-item">
                                <FiSearch/>
                                <Link to='/match'>Match</Link>
                            </li>
                            <li class="nav-item">
                                <FiMessageCircle/>
                                <Link to='/chat'>Chat</Link>
                            </li>
                            <li class="nav-item">
                                <FiSettings/>
                                <Link to="/settings">Settings</Link>
                            </li>
                            <li class="nav-item">
                                <FiHelpCircle class="ml-2"/>
                                <Link to="/help">Help</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

        )
    }
}