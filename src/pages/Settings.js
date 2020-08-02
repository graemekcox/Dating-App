import React, {Component} from 'react';

export default class Settings extends Component {
    render() {
        // let valid_ages = [...Array(100).keys()];
        var valid_ages= [];
        for (var i=19; i<100; i++){
            valid_ages.push(i);
        }

        console.log(valid_ages)
        return (
            <div class="container">
                <div class="text-center">

                    <h4 class="mt-4"> Profile Settings</h4>
                    <hr class="my-4"/>
                    <form class="needs-validation">
                        <div class="row">
                            <div class="col-md-6 md-3">
                                <label for="firstName">First name</label>
                                <input id="firstName" class="form-control" type="text" placeholder="First name" required=""></input>
                            </div>
                            <div class="col-md-6 md-3">
                                <label for="lastName">Last name</label>
                                <input id="lastName" class="form-control" type="text" placeholder="Last name" required=""></input>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-2 mx-5">
                                <label for="age">Age</label>
                                <select class="form-control" id="ageFormSelect">
                                    {valid_ages.map((value, i) =>
                                        <option key={value}>{value}</option>)}
                                </select>
                            </div>
                            <div class="col-md-2 mx-5">
                                <label for="genderFromSelect">Gender</label>
                                <select class="form-control" id="genderFormSelect">
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div class="col-md-2 mx-5">
                                <label for="preference">Orientation</label>
                                <select class="form-control" id="orientationFormSelect">
                                    <option>Straight</option>
                                    <option>Gay</option>
                                    <option>Bi</option>
                                </select>
                            </div>
                        </div>
                        <hr class="my-4"/>
                        <button class="btn btn-primary btn-lg btn-block" type="submit">Save updates</button>
                    </form>
                </div>
            </div>
            )
    }
}