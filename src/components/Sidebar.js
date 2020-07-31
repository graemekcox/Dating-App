import React from 'react';
import {NavLink, Link} from 'react-router-dom';
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

        }
    }
`

const ChatWrapper = styled.div`
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
`;

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
  border-bottom: 1px solid grey;
`;

const SideBarLink = styled(NavLink)`
    color: black;

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
        <FiSearch/>
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
                <ChatWrapper>
                    <AppNameHeader>Dating App</AppNameHeader>
                    <SideBarList>
                        <SideBarListItem>
                            <FiSearch/>
                            <SideBarLink style={{ textDecoration: 'none'}} class='link' to='/match'>Match</SideBarLink>             
                        </SideBarListItem>
                        <SideBarListItem>
                                <FiMessageCircle/>
                                <SideBarLink style={{ textDecoration: 'none'}} class='link' to='/chat'>Chat</SideBarLink>
                        </SideBarListItem>
                        <SideBarListItem>
                            <FiSettings/>
                            <SideBarLink style={{ textDecoration: 'none'}} class="link" to="/settings">Settings</SideBarLink>
                        </SideBarListItem>
                        <SideBarListItem>
                            <FiHelpCircle class="ml-2"/>
                            <SideBarLink class='link' to="/help">Help</SideBarLink>
                        </SideBarListItem>
                        {/* {side_item("Match", '/')} */}
                    </SideBarList>
                </ChatWrapper>
                {/* <ChatWrapper>
                    <AppNameHeader>Dating App</AppNameHeader>
                    {username}
                    <div>
                        <SideBarList>
                            <SideBarListHeader>Channels</SideBarListHeader>
                            <SideBarListItem>
                                <FiHelpCircle class="ml-2"/>
                                <Link style={{ textDecoration: 'none'}} class='link' to="/help">Help</Link>
                            </SideBarListItem>
                            {channels.map(channel)}
                        </SideBarList>
                    </div>
                    <div>
                    <SideBarList>
                        <SideBarListHeader>Direct Messages</SideBarListHeader>
                        {users.map(user)}
                    </SideBarList>
                    </div>
                </ChatWrapper> */}
            </div>

        )
    }
}