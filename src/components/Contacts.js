import React from 'react';
import {Link, Route} from 'react-router-dom';
import {auth} from "../services/firebase";
import {db} from "../services/firebase"
import styled from 'styled-components';
import {FaUserCircle} from "react-icons/fa";
import Chat from '../pages/Chat.js'

const names = ["Susie", "jane"];
const primary = '#3e64ff';


const ContactsWrappper = styled.div`
    grid-column: 2;
    grid-row: 1/4;
    background-color: ${primary};
    color: white;
    min-width: 200px;
    max-width: 200px;
    border-left: 5px solid blue;
`

const ContactSideList = styled.ul`
    width: 100%;
    list-style: none;
    padding-left: 0px;
`

const ContactListItem = styled.li`
    padding: 2px;
    color: white;
    padding: 20px 20px;
`

const SideBarListHeader = styled.li`
    padding-left: 10px;
`

const Contact = styled.div`
    border-bottom: 1px solid grey;
    font-size: 20px;
    color: white;

    &:hover {
        background: blue;
    }
`

export default class Contacts extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            user: auth().currentUser,
            matches: [],
            match_ids: []
        }
    }

    async get_matches() {
        try {
            db.ref("users/"+this.state.user.uid+"/matches/").on("value", snapshot => {
                let ids = [];
                snapshot.forEach ((snap) => {
                    ids.push(snap.key);
                })
                let matches = [];
                ids.forEach( (userid) => {
                    db.ref("users/"+userid+"/").on("value", snapshot => {
                        let val = snapshot.val();
                        matches.push(val.first_name)
                        this.setState({matches});
                    });
                })
                this.setState({match_ids: ids})
                // this.get_chatid();
            });


        } catch (error) {
            this.setState({readError: error.message})
        }
    }

    async componentDidMount(){ 
        this.get_matches();
    }

    render() {
        return (
            <ContactsWrappper>
                <ContactSideList>
                    <SideBarListHeader>Direct Messages</SideBarListHeader>
                    {this.state.matches.map ( (name, index) => (
                        <Contact>
                            <ContactListItem key={name+'_'+index}><FaUserCircle/>
                                <Link to={{
                                    pathname: '/chat/' + this.state.match_ids[index],
                                    aboutProps:{name:'Info'},
                                    state: {matched_uid: this.state.match_ids[index]}
                                }}>{name}</Link>
                            </ContactListItem>
                        </Contact>
                    )
                    )}
                </ContactSideList>
            </ContactsWrappper>

        );
    }
}
