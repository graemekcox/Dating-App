import React from 'react';
import {auth} from "../services/firebase";
import {db} from "../services/firebase"


function formatTime(timestamp){
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time
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
            matched_uid: 'test',  // FIXME temp hardcode another user ID
            // matched_uid: "PgHJehQ0zCg1aoOAaYA40ZmQ23A3",
            chats: [],
            chat_uid: '',
            content: '',
            readError: null,
            writeError: null,
            isMounted: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.update_match = this.update_match.bind(this);
        this.myRef = React.createRef;
    }

    //  update_match(matched_uid) {
    //     this.setState({matched_uid})
    //     console.log(this.state.matched_uid)
    //     console.log(this.state.chat_uid)
    //     this.get_chatid()
        
    // }

    async get_messages() {
        try {
            await db.ref("messages/" + this.state.chat_uid+"/").on("value", snapshot => {
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

    async get_chatid() {
        try{
            await db.ref('users/'+this.state.user.uid+'/chats/').child(this.state.matched_uid)
                .once("value").then(
                    (snapshot) => {
                if (snapshot.exists){
                    this.setState({chat_uid : snapshot.val()})
                    // console.log(this.state.user.uid, this.state.matched_uid, snapshot.val());
                    this.get_messages()
                }
            })
        } catch(error){
            this.setState({readError: error.message});
        }
    }

    // When a new URL is linked, then we need to update matched_id based on the props
    async componentWillReceiveProps(nextProps) {
        const {uid} = await nextProps.match.params;
        this.setState({matched_uid: uid});
        this.get_chatid()

    }

    async componentDidMount(){
        this.setState ({
            readError: null,
            isMounted: true
        });
        const chatArea = this.myRef.current

        const {uid} = this.props.match.params;
        this.setState({matched_uid: uid});

        this.get_chatid();

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
                {/* <Contacts update_match={this.update_match} names ={this.state.matches} ids={this.state.match_ids}/>    */}
                <div class="border col-md-10 dml-sm-auto col-lg-10 pt-3 px-4 container-fluid">
                    <div class="position-relative overflow-hidden p-5 p-md-5">
                    <div className="chat-area" class="container-fluid" ref={this.myRef}>
                        {this.state.chats.map((chat,ind) => {
                            return (
                                <Message key={ind} id={this.state.matched_uid} user={this.state.user} chat={chat} />
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
                    </div>
                    <div>
                        Login is as: <strong>{this.state.user.email}</strong>
                    </div>

                </div>

            </div>
        )
    }
}

export default Chat