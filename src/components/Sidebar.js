import React from 'react';
import {NavLink} from 'react-router-dom';
import {FiMessageCircle, FiSettings} from "react-icons/fi";
import {FaSearch, FaHeart,  FaSignOutAlt, FaRegQuestionCircle} from 'react-icons/fa'
import styled from 'styled-components';
import {signout} from '../helpers/auth';

const primary = '#3e64ff';
const white = '#ffffff';

const SideBarWrapper = styled.div`
    grid-column: 1;
    grid-row: 1/4;
    background-color: ${primary};
    color: ${white};
    min-width: 200px;
    max-width: 200px;
    padding-left: 0px;
    height: 100%;
`
const AppNameHeader = styled.h1`
  color: #fff;
  padding-left: 10px;
  font-size: 20px;
  padding-top: 10px;
`;

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
  border-bottom: 1px solid grey;
`;

const SideBarLink = styled(NavLink)`
    color: white;

    &.active {
        color: black;
        font-weight: bold;
        // background: ${white}
    }
`

const paddingLeft = 'padding-left: 10px';

const SideBarListItem = styled.li`
    padding: 2px;
    font-size: 16px;
    padding: 20px 20px;
    color: white;
    padding-left: 20px;
    &:hover {
        background: ${white};
        color: ${primary};
    }
`;

const SideBarListHeader = styled.li`${paddingLeft};`;

const Green = styled.span`color: #38978d;`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○');


const channel = ({ id, name }) => <SideBarListItem key={`channel-${id}`}># {name}</SideBarListItem>;

const user = ({ id, name }) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble /> {name}
  </SideBarListItem>
);

const side_item = ({name, path}) => (
    <SideBarListItem>
        <FaSearch/>
        <SideBarLink style={{ textDecoration: 'none'}} class='link' to={path}>{name}</SideBarLink>             
    </SideBarListItem>
);

export default class Sidebar extends React.Component {
    render (){
        const username="gcox";
        const channels=["1"];
        // const users = ["Susie"];
        return(
            <div>
                <SideBarWrapper>
                    <a class="" href="/">
                        <AppNameHeader><FaHeart class="mr-2"/>Dating App</AppNameHeader>
                    </a>
                    <SideBarList>
                        <SideBarListItem>
                            <FaSearch class="mr-2"/>
                            <SideBarLink style={{ textDecoration: 'none'}} class='link' to='/match'>Match</SideBarLink>             
                        </SideBarListItem>
                        <SideBarListItem>
                                <FiMessageCircle class="mr-2"/>
                                <SideBarLink style={{ textDecoration: 'none'}} class='link' to='/chat'>Chat</SideBarLink>
                        </SideBarListItem>
                        <SideBarListItem>
                            <FiSettings class="mr-2"/>
                            <SideBarLink style={{ textDecoration: 'none'}} class="link" to="/settings">Settings</SideBarLink>
                        </SideBarListItem>
                        <SideBarListItem>
                            <FaRegQuestionCircle class="mr-2"/>
                            <SideBarLink style={{color: 'white', textDecoration: 'none'}}
                            class='link' to="/help">Help</SideBarLink>
                        </SideBarListItem>
                        <SideBarListItem>
                            <FaSignOutAlt class="mr-2"/>
                            <SideBarLink onClick={()=> signout()} class='signout' to="#">Signout</SideBarLink>
                        </SideBarListItem>
                    </SideBarList>
                </SideBarWrapper>
            </div>
        )
    }
}