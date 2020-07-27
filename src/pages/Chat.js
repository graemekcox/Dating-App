import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import {auth} from "../services/firebase";
import {db} from "../services/firebase"
import firebase from 'firebase';
import { textChangeRangeIsUnchanged } from 'typescript';

//FIXME Temp until we have IDs we can fetch
let names = ['Jane', 'John']

function formatTime(timestamp){
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time
}


function Contacts(){
    return (
        <nav class="col-md-2 bg-light sidebar border-right border-left container-fluid">
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

function Message(props){
    return (
        <div class="container-fluid mb-2 rounded">
            <div class={((props.user.uid === props.chat.uid) ? 
                "offset-md-8 bg-primary  "
             :  "bg-success ") + "w-25 p-3 col-md-6 text-right rounded"}>
            <p key={props.chat.timestamp} className={"chat-bubble " + (props.user.uid === props.chat.uid ? 
                "current-user" : "")}
                >
                {props.chat.content}
                <br/>
                {/* <span className="chat-time float-right">{formatTime(props.chat.timestamp)}</span> */}
            </p>
            </div>
        </div>
    );
}
// need to know if message is our own
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: auth().currentUser,
            matched_uid: "ZsD7vsIYiec5lzITy21tz7HLO9T2", // FIXME temp hardcode another user ID
            chats: [],
            chat_uid: "one",
            content: '',
            readError: null,
            writeError: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.myRef = React.createRef;
    }

    async componentDidMount(){
        this.setState ({readError: null});
        const chatArea = this.myRef.current;

        // First get chatID
        // try {
        //     db.ref("Users/" + this.state.user.uid+"chats/" + this.state.matched_uid).on("value", snapshot => {
        //         this.setState({chat_id: snapshot});
        //         console.log(snapshot)
        //     });
        // } catch (error) {
        //     this.setState({readError: error.message})
        // }
        // const user = firebase.database().ref("Users/"+ this.state.user.uid)
        // const data = 1234;
        try{
        db.ref('users/'+this.state.user.uid+'/chats/').child(this.state.matched_uid).on("value",
            function(snapshot){
                // this.setState({ chat_uid : snapshot.val()})
                console.log(snapshot.val())
                // this.setState({ chat_uid : snapshot.val()})
            });
        } catch(error){
            // console.log
            this.setState({readError: error.message})
        }

        try {
            db.ref("messages/" + this.state.chat_uid+"/").on("value", snapshot => {
                let chats= [];
                snapshot.forEach ((snap) => {
                    chats.push(snap.val());
                })
                chats.sort(function (a,b) {return a.timestamp - b.timestamp})
                this.setState({chats});
                // chatArea.scrollBy(0, chatArea.scrollHeight)
            });
        } catch (error) {
            this.setState({readError: error.message})
        }
    }

    handleChange(event) {
        this.setState({
            content: event.target.value
        })
    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.user.uid)
        this.setState({ writeError: null});
        try {
            await db.ref("messages/" + this.state.chat_uid+"/").push({
                content: this.state.content,
                timestamp: Date.now(),
                uid: this.state.user.uid
            });
            this.setState({ content: ''});
        } catch (error) {
            this.setState({ writeError: error.message});
        }
    }


    render() {
        return (
            <div class="row">
                <Contacts/>   
                <div class="border col-md-10 dml-sm-auto col-lg-10 pt-3 px-4 container-fluid">
                    <div className="chat-area" class="container-fluid" ref={this.myRef}>
                        {this.state.chats.map(chat => {
                            return (
                                <Message user={this.state.user} chat={chat} />
                            )

                        })}
                    </div>
                    {/* <div class="form-inline mb-mr-2 mr-4"> */}
                        <form class="form-inline mb-2 mr-4" onSubmit={this.handleSubmit}>
                            <input class="ml-4 mb-2 container-fluid"
                                onChange={this.handleChange} value={this.state.content}/>
                                {this.state.error ? <p>{this.state.writeError}</p> : null}
                            <button type="submit" class="btn ml-4 btn-primary"
                            >Send</button>
                        </form>
                    {/* </div> */}
                    <div>
                        Login is as: <strong>{this.state.user.email}</strong>
                    </div>

                </div>

            </div>
        )
    }
}

// class Chat extends React.Component{
//     constructor(props){
//         super(props);
//         // ID of other person, so photo can be displayed
//       }

//       render() {
//           return (
//               <Router>
//             <div class="container-fluid">
//                 <Contacts/>
//                 <main class="col-md-10 ml-sm-auto col-lg-10 px-4" role="main">
//                     {/* <Chatlog/> */}
//                     {/* <div class="conversation_active">
//                         <img src="" alt="placeholder"/>
//                         <div class="title-text">John Doe</div>
//                         <div class="conversation-msg">This is a message</div>
//                     </div> */}
//                     <div id="chat-title">
//                         <h1> John Doe</h1>
//                     </div>
//                     {/* <div id="chat-msg-list bg-primary">
//                         <div class="message-row">
//                             <div class="message-text text-left"> Hello</div>
//                         </div>
//                         <div class="message-row">
//                             <div class="message-text text-right"> Hey</div>
//                         </div>
//                         <div class="message-row">
//                             <div class="message-text text-left"> What's up?</div>
//                         </div>
//                         <div class="message-row">
//                             <div class="message-text text-right">Blocked</div>
//                         </div>
//                     </div> */}
//                     <Chatlog/>
//                     <footer>
//                         <div class="form-group">
//                             {/* <label for="message-input">Send Message</label> */}
//                             <input class="form-control" id="message-input"
//                             aria-describedby="messageForm" placeholder="Send a message?"></input>
//                             <small class="form-text text-muted">They seem like they want to talk</small>
//                             <button type="submit" class="btn btn-primary mb-2">Send</button>
//                         </div>
//                     </footer>
//                 </main>

//             </div>    
//             </Router>
//           )
//       }
// }

export default Chat