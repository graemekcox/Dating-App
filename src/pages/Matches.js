import React from 'react';
import Person from '../components/Person.js';
import {db} from "../services/firebase"

const valid_bg = [
    'blanchedalmond',
    'aquamarine',
    'cornflowerblue'
]
  

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
        this.get_users();
    }

    // async componentWillUpdate() {
    //     await this.get_users();
    // }


    render (){
        return(
            <div class="row">
                {this.state.users.slice(0,3).map(( uid, ind) => {
                    
                    return (
                        <div class="col">
                            { this.state.users[ind] ?
                            <Person uid={uid} bg={valid_bg[ind]}/> : null
                            }
                        </div>
                    )
                })}
                {/* {
                    this.state.users[0] ?<Person bg={valid_bg[0]} uid={this.state.users[0]}/>
                                : null
                } */}
                {/* <div class="col">
                    <Person bg={valid_bg[0]} uid={this.state.users}/>
                </div> */}
            </div>
        )
    }
}