import React from 'react';
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

  class Person extends React.Component{
      constructor(props){
        super(props);
        this.state = {
          gender: genders.MALE,
          age: 25,
          first_name: "John",
          last_name: "D"
        }
      }
    render() {
      return (
        <div class="ml-sm-auto px-4">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap">
                <h1 class="h2">John Doe</h1>
                <div class="btn-group mb-2">
                    <button class="btn btn-sm btn-outline-secondary">Next!</button>
                    <button class="btn btn-sm btn-outline-secondary">Like</button>
                    <button class="btn btn-sm btn-outline-secondary">Superlike</button>
                </div>
            </div>
            <div class="row">
                <ImageCarousel/>
            </div>
            <div class="row">
                <div class="col">
                    <h2 class="text-left">Interests</h2>
                    <ul class='text-left'>
                        <li>Hiking</li>
                        <li>Music</li>
                    </ul>

                </div>
                <div class="col">
                    <h2>About me!</h2>
                    <h5>{this.state.first_name} {this.state.last_name}</h5>
                    <h5>Gender = {this.state.gender}</h5>
                    <h5>Age = {this.state.age}</h5>
                </div>
            </div>

        </div>
      )
    }
  }

  export default Person