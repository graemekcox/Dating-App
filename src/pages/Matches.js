import React from 'react';
import Person from '../components/Person.js';
import {db} from "../services/firebase"


export default class Matches extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }
    async get_users() {
        try {
            await db.ref("users/").once("value").then( snapshot => {
                let users = [];
                snapshot.forEach ((snap) => {
                    users.push(snap.key);
                })
                this.setState({users});
                console.log(this.state.users)
            });
        } catch (error) {
            this.setState({readError: error.message})
        }
    }

    
    async componentDidMount() {
        await this.get_users();
    }

    render (){
        return(
            <div class="row">
                {this.state.users.slice(0,3).map(( uid) => {
                    return (
                        <div class="col">
                            <Person uid={uid}/>
                        </div>
                    )
                })}
                <div class="col">
                    <Person uid={this.state.users[0]}/>
                </div>
            </div>
        )
    }
}