import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {signin, signInWithGoogle} from '../helpers/auth';

export default class Login extends Component {
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
        console.log(event.target.name, event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    async handleSubmit(event) {
        event.preventDefault();
        this.setState({error: ''});
        try {
            await signin(this.state.email, this.state.password);
        } catch(error){
            console.log("Error!")
            this.setState({error: error.message});
        }
    }

    async googleSignIn() {
        try {
            await signInWithGoogle();
        } catch(error) {
            this.setState({ error: error.message});
        }
    }

    render () {
        return (
            <div class="text-center">
                <form autoComplete="off" class="form-signin" onSubmit={this.handleSubmit}>
                    <h1 class="h3 mb-3 font-weight-normal"> Please sign in</h1>
                    <p>Fill in the below form with your credentials</p>
                    <div class="my-2">
                        <input id="inputEmail" name="email" class="form-control" type="email"
                        placeholder="Email address" onChange={this.handleChange.bind(this)} value={this.state.email}></input>
                        <small>Your email won't be shared</small>
                    </div>
                    <div class="my-2">
                        <input id="inputPassword" name="password" class="form-control" type="password"
                        placeholder="Password" onChange={this.handleChange.bind(this)} value={this.state.password}></input>
                    </div>
                    <div class="my-3">
                        {this.state.error ? <p>{this.state.error}</p> : null}
                        <button class="btn btn-lg btn-primary" type="submit">Login</button>
                    </div>
                    <p>Or</p>
                    <button class="btn btn-lg btn-primary" type="button" onClick={this.googleSignIn}>
                        Sign in with Google
                    </button>
                    <hr></hr>
                    <p>Don't have an account? <Link to="/signup"> Signup</Link></p>
                </form>
            </div>
        )
    }
}
