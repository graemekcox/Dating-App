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
            db.ref("users/" + auth().currentUser.uid ).set({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                uid: auth().currentUser.uid
            });
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
            <div class="text-center">
                <form onSubmit={this.handleSubmit}>
                    <h1 class="h3 mb-3 font-weight-normal"> Sign up</h1>
                    <p>Fill in the below form with your credentials</p>
                    <div class="my-2">
                        <input id="inputEmail" name="email" class="form-control" type="email"
                        placeholder="Email address" onChange={this.handleChange.bind(this)} value={this.state.email} required></input>
                        <small>Your email won't be shared</small>
                    </div>

                    <div class="my-2">
                        <input id="inputPassword" name="password" class="form-control" type="password"
                        placeholder="Password" onChange={this.handleChange.bind(this)} value={this.state.password} required></input>
                    </div>
                    <div class="my-2">
                        <input placeholder="First Name" name="first_name" onChange={this.handleChange} value={this.state.first_name}
                        type="text" class="form-control" required></input>
                    </div>
                    <div class="my-2">
                        <input placeholder="Last Name" name="last_name" onChange={this.handleChange} value={this.state.last_name}
                        type="text" class="form-control" required></input>
                    </div>
                    <div>
                        {this.state.error ? <p>{this.state.error}</p> : null}
                        <button class="btn btn-lg btn-primary" type="submit">Sign up</button>
                    </div>
                    <p>Or</p>
                    <button class="btn btn-lg btn-primary" type="button" onClick={this.googleSignIn}>
                        Sign in with Google
                    </button>
                    <hr></hr>
                    <p>Already have an accout? <Link to="/login"> Login</Link></p>
                </form>
            </div>
        )
    }
}