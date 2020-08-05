import React from 'react';
import styled from 'styled-components';
import {db} from "../services/firebase"

const genders = {
    MALE: 'male',
    FEMALE: 'female',
    n_a: 'n/a'
  }
  
function ImageCarousel(){
    return (
        <div id="carousel-pics" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carousel-pics" data-slide-to="0" class="active"></li>
            <li data-target="#carousel-pics" data-slide-to="1"></li>
        </ol>
        <div class="row">
            <div class="carousel-inner" role="listbox">
                <div class="carousel-item active">
                    <img class="d-block w-100" alt="First slide" 
                    src='https://mdbootstrap.com/img/Photos/Slides/img%20(35).jpg'/>
                                            </div>
                <div class="carousel-item">
                    <img class="d-block w-100" alt="Second slide"  
                    src="https://mdbootstrap.com/img/Photos/Slides/img%20(33).jpg"/>
                    
                    </div>
            </div>
            <a class="carousel-control-prev" href="#carousel-pics" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next" href="#carousel-pics" role="button" data-slide="next">
                <span class="carousel-control-next-icon"></span>
            </a>
        </div>
    </div>

    );
}

const CardWrapper = styled.div`
  overflow: hidden;
  padding: 32px;
  background: ${props => props.bg};
  margin: 48px auto 0;
  width: 400px;
  font-family: Quicksand, arial, sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, .05), 0 0px 40px rgba(0, 0, 0, .08);
  border-radius: 5px;
`

const CardHeader = styled.header`
  padding-top: 32px;
  padding-bottom: 32px;
`

const CardHeading = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`

const CardBody = styled.div`
  padding-right: 32px;
  padding-left: 32px;
`

const CardBodyText = styled.p`
    position: relative;
    padding: 0;
    margin: 0;
    border: 0;
    text-align: center;
`

  class Person extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            uid: this.props.uid,
            // uid: 'PgHJehQ0zCg1aoOAaYA40ZmQ23A3'
        }
    }

    async get_user_info() {
        console.log(this.state.uid, this.props.uid)
        try {
            await db.ref("users/" + this.props.uid+"/").once("value").then( snapshot => {
                snapshot.forEach ((snap) => {
                    this.setState( { [snap.key]: snap.val()});
                })
            });
        } catch (error) {
            this.setState({readError: error.message})
        }
        console.log(this.state, this.props.uid)
    }

    async componentDidUpdate(prevProps){
        console.log("PREV PROPS")
        console.log(prevProps)
    }
    async componentWillReceiveProps() {
        this.get_user_info();
    }
    
    // async componentDidMount() {
    //     this.get_user_info();
    // }


    render() {
      return (
        <div class="">
            {/* <div class="d-flex justify-content-between flex-wrap flex-md-nowrap">
            <div class="row">
                <ImageCarousel/>
            </div>
            </div> */}
            <CardWrapper bg={this.props.bg}>
                <CardBody>
                    <CardBodyText>{this.state.orientation}</CardBodyText>
                    <CardBodyText>{this.state.gender}</CardBodyText>
                    <CardBodyText>TV interests</CardBodyText>
                    <CardBodyText>Pasta is best</CardBodyText>
                    <CardBodyText>Math major</CardBodyText>
                </CardBody>
                <CardHeader>
                    <CardHeading>
                        Age = {this.state.age} years old
                    </CardHeading>
                </CardHeader>
            </CardWrapper>
        </div>
      )
    }
  }

  export default Person