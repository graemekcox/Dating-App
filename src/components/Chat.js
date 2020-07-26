import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

//FIXME Temp until we have IDs we can fetch
let names = ['Jane', 'John']

// need to know if message is our own


class Message extends React.Component{
    constructor(props){
        super(props);

    }
}

class Chatlog extends React.Component{
    render() {
        return (
            <div>
                
            </div>
        );  
    }
}

function Contacts(){
    return (
        <nav class="col-md-2 d-none d-md-block bg-light sidebar border-right border-left">
        <div class="sidebar-sticky">
            <ul class="nav flex-column">
                {names.map( (name) => (
                    // Add Avatar?
                    <Link to="/convo/${name}">{name}</Link>))
                }
            </ul>
        </div>
    </nav>

    );
}


class Chat extends React.Component{
    constructor(props){
        super(props);
        // ID of other person, so photo can be displayed
      }

      render() {
          return (
              <Router>
            <div class="container-fluid">
                <Contacts/>
                <main class="col-md-10 ml-sm-auto col-lg-10 px-4" role="main">
                    {/* <Chatlog/> */}
                    {/* <div class="conversation_active">
                        <img src="" alt="placeholder"/>
                        <div class="title-text">John Doe</div>
                        <div class="conversation-msg">This is a message</div>
                    </div> */}
                    <div id="chat-title">
                        <h1> John Doe</h1>
                    </div>
                    {/* <div id="chat-msg-list bg-primary">
                        <div class="message-row">
                            <div class="message-text text-left"> Hello</div>
                        </div>
                        <div class="message-row">
                            <div class="message-text text-right"> Hey</div>
                        </div>
                        <div class="message-row">
                            <div class="message-text text-left"> What's up?</div>
                        </div>
                        <div class="message-row">
                            <div class="message-text text-right">Blocked</div>
                        </div>
                    </div> */}
                    <Chatlog/>
                    <footer>
                        <div class="form-group">
                            {/* <label for="message-input">Send Message</label> */}
                            <input class="form-control" id="message-input"
                            aria-describedby="messageForm" placeholder="Send a message?"></input>
                            <small class="form-text text-muted">They seem like they want to talk</small>
                            <button type="submit" class="btn btn-primary mb-2">Send</button>
                        </div>
                    </footer>
                </main>

            </div>    
            </Router>
          )
      }
}

export default Chat