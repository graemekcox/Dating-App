import React from 'react';
const genders = {
    MALE: 'male',
    FEMALE: 'female',
    n_a: 'n/a'
  }
  
  class Person extends React.Component{
      constructor(props){
        super(props);
        this.state = {
          gender: genders.MALE,
          age: 25,
          first_name: "Graeme",
          last_name: "C"
        }
      }
    render() {
      return (
        <div class="row">
          <div class="col-sm-8">
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
        </div>
        <div class="col-sm-4">
            <h5>{this.state.gender}</h5>
            <h5>{this.state.age}</h5>
            <h5>{this.state.first_name} {this.state.last_name}</h5>
        </div>
        </div>
      )
    }
  }

  export default Person