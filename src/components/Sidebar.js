import React from 'react';
import {Link} from 'react-router-dom';
import {FiSearch, FiMessageCircle, FiSettings,FiHelpCircle} from "react-icons/fi";
import styled from 'styled-components';

// const Section = styled.section`
//     color: white;
//     background: blue
// `

const primary = '#3e64ff';
const white = '#ffffff';

const StyledSide = styled.nav`
    background: ${primary};
    min-width: 150px;
    max-width: 150px;
    color: #000000;

    ul.components{
        padding: 0;
        @include transition(.3s);
    }
    ul{
        li{
            font-size: 16px;
            >ul{
                margin-left: 10px;
                li{
                    font-size: 14px;
                }
            }
            a {
                display: block;
                padding: 10px 30px;
                border-bottom: 1px solid grey;
                color: #ffffff;
                font-size: 16px;
                .link {
                    margin-right: 15px;

                }
                &:hover{
                    background: white;
                    color: ${primary};
                }
            }        
        }
    }
`

export default class Sidebar extends React.Component {
    render (){
        return(
            <div>
                <StyledSide id="sidebar" class="active">
                        <ul class="list-unstyled components mb-5">
                            <li class="nav-item">
                                <a>
                                    <FiSearch/>
                                    <Link style={{ textDecoration: 'none'}} class='link' to='/match'>Match</Link>             
                                </a>
                            </li>
                            <li class="nav-item">
                                <a>
                                    <FiMessageCircle/>
                                    <Link style={{ textDecoration: 'none'}} class='link' to='/chat'>Chat</Link>
                                </a>
                            </li>
                            <li class="nav-item">
                                <FiSettings/>
                                <Link style={{ textDecoration: 'none'}} class="link" to="/settings">Settings</Link>
                            </li>
                            <li class="nav-item">
                                <FiHelpCircle class="ml-2"/>
                                <Link style={{ textDecoration: 'none'}} class='link' to="/help">Help</Link>
                            </li>
                        </ul>
                </StyledSide>
            </div>

        )
    }
}