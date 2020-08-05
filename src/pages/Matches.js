import React from 'react';
import Person from '../components/Person.js';

export default class Matches extends React.Component {
    render (){
        return(
            <div class="row">
                <div class="col">
                    <Person bg="chartreuse"></Person>
                </div>
                <div class="col">
                    <Person bg="cornflowerblue"></Person>
                </div>
                <div class="col">
                    <Person bg="crimson"></Person>
                </div>
            </div>
        )
    }
}