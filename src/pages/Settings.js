import React, {Component} from 'react';
import styled from 'styled-components';
import {auth} from "../services/firebase";
import {db} from "../services/firebase"

const SettingsWrapper = styled.div`
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ProfileSettingsWrapper = styled.div`
    text-align: center;
    width: 700px
    display: inline-block
`



export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: auth().currentUser,
            first_name: '',
            last_name: '',
            age: '',
            gender: '',
            orientation: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        console.log(this.state)
        console.log(this.state.user.uid)
        // console.log(this.state.user.uid)
        // this.setState({ writeError: null});
        // try {
        //     await db.ref("messages/" + this.state.chat_uid+"/").push({
        //         content: this.state.content,
        //         timestamp: Date.now(),
        //         uid: this.state.user.uid
        //     });
        //     this.setState({ content: ''});
        // } catch (error) {
        //     this.setState({ writeError: error.message});
        // }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {

        var valid_ages= [];  // Range of possible ages
        for (var i=19; i<100; i++){
            valid_ages.push(i);
        }

        return (
            <SettingsWrapper>
                <ProfileSettingsWrapper>
                    <h4 class="mt-4"> Profile Settings</h4>
                    <hr class="my-4"/>
                    <form class="needs-validation" onSubmit={this.handleSubmit}>
                        <div class="row">
                            <div class="col-md-6 md-3">
                                <label>First name</label>
                                <input id="firstName" name="first_name" onChange={this.handleChange} value={this.state.first_name}
                                class="form-control" type="text" placeholder="First name" required></input>
                            </div>
                            <div class="col-md-6 md-3">
                                <label>Last name</label>
                                <input id="lastName" name="last_name" onChange={this.handleChange} value={this.state.last_name}
                                class="form-control" type="text" placeholder="Last name" required></input>
                            </div>
                        </div>
                        <div class="row  justify-content-center mt-3">
                            <div class="col-auto mx-2">
                                <label>Age</label>
                                <select class="form-control" name="age" id="ageFormSelect" 
                                onChange={this.handleChange} value={this.state.age} required> 
                                    <option value='' selected disabled hidden >Please choose...</option>
                                    {valid_ages.map((value, i) =>
                                        <option key={value}>{value}</option>)}
                
                                </select>
                            </div>
                            <div class="col-auto mx-2">
                                <label>Gender</label>
                                <select class="form-control" id="genderFormSelect" 
                                name="gender"
                                onChange={this.handleChange} required>
                                    <option value='' selected disabled hidden >Please choose...</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div class="col-auto mx-2">
                                <label>Orientation</label>
                                <select class="form-control" name="orientation" 
                                onChange={this.handleChange} id="orientationFormSelect" required>
                                    <option value='' selected disabled hidden> Please choose...</option>
                                    <option>Straight</option>
                                    <option>Gay</option>
                                    <option>Bi</option>
                                </select>
                            </div>
                        </div>
                        <hr class="my-4"/>
                        <button class="btn btn-primary btn-lg btn-block" type="submit">Save updates</button>
                    </form>
                </ProfileSettingsWrapper>
            </SettingsWrapper>
            )
    }
}