import React, { Component } from "react";
import styled from "styled-components";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";

const SettingsWrapper = styled.div`
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileSettingsWrapper = styled.div`
    text-align: center;
    width: 700px
    display: inline-block
`;

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      first_name: "",
      last_name: "",
      work_tag: "",
      location: "",
      age: "", //dropdown
      gender: "", //dropdown
      orientation: "", //dropdown
      fav_colour: "", //dropdown
      height: "", //drop down
      zodiac_sign: "", //dropdown

      writeError: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });

    try {
      db.ref("users/" + this.state.user.uid).update({
        //users/Arham/
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        work_tag: this.state.work_tag,
        location: this.state.location,
        age: this.state.age,
        gender: this.state.gender,
        orientation: this.state.orientation,
        fav_colour: this.state.fav_colour,
        height: this.state.height,
        zodiac_sign: this.state.zodiac_sign,
      });
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    var valid_ages = []; // Range of possible ages
    var valid_height = [
      "<5'0",
      "5'0",
      "5'1",
      "5'2",
      "5'3",
      "5'4",
      "5'5",
      "5'6",
      "5'7",
      "5'8",
      "5'9",
      "5'10",
      "5'11",
      "6'0",
      "6'1",
      "6'2",
      "6'3",
      "6'4",
      ">6'4",
    ]; // Range of possible ages
    var valid_colour = [
      "red",
      "yellow",
      "blue",
      "green",
      "purple",
      "orange",
      "black",
      "white",
      "grey",
    ];
    var valid_zodiac_sign = [
      "Capricorn",
      "Aquarius",
      "Pisces",
      "Aries",
      "Taurus",
      "Gemini",
      "Cancer",
      "Leo",
      "Virgo",
      "Libra",
      "Scorpio",
      "Sagittarius",
    ];

    // Range of possible ages
    for (var i = 18; i < 100; i++) {
      valid_ages.push(i);
    }
    return (
      <SettingsWrapper>
        <ProfileSettingsWrapper>
          <h4 class="mt-4"> Profile Settings</h4>
          <hr class="my-4" />
          <form class="needs-validation" onSubmit={this.handleSubmit}>
            <div class="row">
              <div class="col-md-6 md-3">
                <label>First name</label>
                <input
                  id="firstName"
                  name="first_name"
                  onChange={this.handleChange}
                  value={this.state.first_name}
                  class="form-control"
                  type="text"
                  placeholder="First name"
                  required
                ></input>
              </div>
              <div class="col-md-6 md-3">
                <label>Last name</label>
                <input
                  id="lastName"
                  name="last_name"
                  onChange={this.handleChange}
                  value={this.state.last_name}
                  class="form-control"
                  type="text"
                  placeholder="Last name"
                  required
                ></input>
              </div>
            </div>
            <div class="row  justify-content-center mt-3">
              <div class="col-md-6 md-3">
                <label>Occupation</label>
                <input
                  id="workTag"
                  name="work_tag"
                  onChange={this.handleChange}
                  value={this.state.work_tag}
                  class="form-control"
                  type="text"
                  placeholder="Where are you working?"
                  required
                ></input>
              </div>
              <div class="col-md-6 md-3">
                <label>Location</label>
                <input
                  id="location"
                  name="location"
                  onChange={this.handleChange}
                  value={this.state.location}
                  class="form-control"
                  type="text"
                  placeholder="Where are you living?"
                  required
                ></input>
              </div>
            </div>
            <div class="row  justify-content-center mt-3">
              <div class="col-auto mx-2">
                <label>Age</label>
                <select
                  class="form-control"
                  name="age"
                  id="ageFormSelect"
                  onChange={this.handleChange}
                  value={this.state.age}
                  required
                >
                  <option value="" selected disabled hidden>
                    Please choose...
                  </option>
                  {valid_ages.map((value, i) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </div>
              <div class="col-auto mx-2">
                <label>Gender</label>
                <select
                  class="form-control"
                  id="genderFormSelect"
                  name="gender"
                  onChange={this.handleChange}
                  required
                >
                  <option value="" selected disabled hidden>
                    Please choose...
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div class="col-auto mx-2">
                <label>Orientation</label>
                <select
                  class="form-control"
                  name="orientation"
                  onChange={this.handleChange}
                  id="orientationFormSelect"
                  required
                >
                  <option value="" selected disabled hidden>
                    {" "}
                    Please choose...
                  </option>
                  <option>Straight</option>
                  <option>Gay</option>
                  <option>Bi</option>
                </select>
              </div>
            </div>
            <div class="row  justify-content-center mt-3">
              <div class="col-auto mx-2">
                <label>Favourite Colour</label>
                <select
                  class="form-control"
                  name="fav_colour"
                  id="favColourSelect"
                  onChange={this.handleChange}
                  value={this.state.fav_colour}
                  required
                >
                  <option value="" selected disabled hidden>
                    Please choose...
                  </option>
                  {valid_colour.map((value, i) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </div>
              <div class="col-auto mx-2">
                <label>Height</label>
                <select
                  class="form-control"
                  name="height"
                  id="heightSelect"
                  onChange={this.handleChange}
                  value={this.state.height}
                  required
                >
                  <option value="" selected disabled hidden>
                    Please choose...
                  </option>
                  {valid_height.map((value, i) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </div>
              <div class="col-auto mx-2">
                <label>Zodiac Sign</label>
                <select
                  class="form-control"
                  name="zodiac_sign"
                  id="zodiacSignSelect"
                  onChange={this.handleChange}
                  value={this.state.zodiac_sign}
                  required
                >
                  <option value="" selected disabled hidden>
                    Please choose...
                  </option>
                  {valid_zodiac_sign.map((value, i) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </div>
            </div>
            <hr class="my-4" />
            <button class="btn btn-primary btn-lg btn-block" type="submit">
              Save updates
            </button>
          </form>
        </ProfileSettingsWrapper>
      </SettingsWrapper>
    );
  }
}
