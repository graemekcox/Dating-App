import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {signup, signInWithGoogle} from '../helpers/auth';
import {auth} from "../services/firebase";
import {db} from "../services/firebase"

export default class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    async handleSubmit(event) {
        event.preventDefault();
        this.setState({error: ''});
        try {
            await signup(this.state.email, this.state.password);
            await db.ref("users/" + auth().currentUser.uid ).child({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                uid: auth().currentUser.uid
            });
            // db.ref("users/" + auth().currentUser.uid ).child('first_name').setValue(this.state.first_name);
            // db.ref("users/" + auth().currentUser.uid ).child('name_name').setValue(this.state.last_name);
            // db.ref("users/" + auth().currentUser.uid+"/").child('uid').setValue(auth().currentUser);

        } catch(error){
            this.setState({error: error.message});
        }
    }

    async googleSignIn(){
        try {
            await signInWithGoogle();
        } catch (error) {
            this.setState({ error: error.message});
        }
    }

    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1> Sign up</h1>
                    <p>Fill in the below form with your credentials</p>
                    <div>
                        <input placeholder="Email" name="email" onChange={this.handleChange} value={this.state.email}
                        type="email"></input>
                    </div>
                    <div>
                        <input placeholder="Password" name="password"
                        onChange={this.handleChange} value={this.state.password}
                        type="password"></input>
                    </div>
                    <div>
                        <input placeholder="First Name" name="first_name" onChange={this.handleChange} value={this.state.first_name}
                        type="text" class="form-control"></input>
                    </div>
                    <div>
                        <input placeholder="Last Name" name="last_name" onChange={this.handleChange} value={this.state.last_name}
                        type="text" class="form-control"></input>
                    </div>
                    <div>
                        {this.state.error ? <p>{this.state.error}</p> : null}
                        <button type="submit">Sign up</button>
                    </div>
                    <p>Or</p>
                    <button onClick={this.googleSignIn} type="button">
                        Sign up with Google
                    </button>
                    <hr></hr>
                    <p>Already have an accout? <Link to="/login"> Login</Link></p>
                </form>
            </div>
        )
    }
}