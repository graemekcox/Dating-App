import React from 'react';
import {auth} from "../services/firebase";
import {db} from "../services/firebase"
import styled from 'styled-components';

function formatTime(timestamp){
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time
}

const MessageBubble = styled.div`

    display: flex;
    flex-direction: column;

    font-family: "Helvetica Neue", Helvetica, sans-serif;
    font-size: 25px;
    max-width: 600px;
    margin: 50px auto;
    display: flex;

`

const MessageContent_Match = styled.p`
    max-width: 255px;
    word-wrap: break-word;
    margin-bottom: 12px;
    line-height: 24px;
    position: relative;
    padding: 10px 20px;
    border-radius: 25px;
    background:#E5E5EA;
	color:black;
		
	&:before {
        position: absolute;
        content: "";
        bottom: -2px;
        height: 20px;
		left:-7px;
		border-left:20px solid #E5E5EA;
		border-bottom-right-radius: 16px 14px;
		transform:translate(0, -2px);
	}

	&:after {
        position: absolute;
        content: "";
        bottom: -2px;
        height: 20px;
		left:4px;
		width:26px;
		background:white;
		border-bottom-right-radius: 10px;
		transform:translate(-30px, -2px);
	}
`

const MessageContent_User = styled.p`
    max-width: 255px;
    word-wrap: break-word;
    margin-bottom: 12px;
    line-height: 24px;
    position: relative;
    padding: 10px 20px;
    border-radius: 25px;
	color:white; 
	background:#0B93F6;
	align-self: flex-end;
		
	&:before {
		right:-7px;
		border-right:20px solid #0B93F6;
		border-bottom-left-radius: 16px 14px;
        transform:translate(0, -2px);
        position: absolute;
        content: "";
        bottom: -2px;
        height: 20px;
	}

	&:after {
		right:-56px;
		width:26px;
		background:white;
		border-bottom-left-radius: 10px;
        transform:translate(-30px, -2px);
        position: absolute;
        content: "";
        bottom: -2px;
        height: 20px;
	}

`


function Message(props){

    return (
        <div class="container-fluid mb-2 rounded">
            <MessageBubble user_uid={props.user.uid} chat_uid={props.chat.uid}>
                {(props.user.uid === props.chat.uid) ? (
                    <MessageContent_User>{props.chat.content}</MessageContent_User>
                ) : (
                    <MessageContent_Match>{props.chat.content}</MessageContent_Match>
                )}
                {/* <br/> */}
                {/* <span className="chat-time float-right">{formatTime(props.chat.timestamp)}</span> */}
            </MessageBubble>
        </div>
    );
}
// need to know if message is our own
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: auth().currentUser,
            matched_uid: '',
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
                <div class="container-fluid  vh-100">
                    <div class="position-relative overflow-hidden p-5 p-md-5">
                        <div className="chat-area" class="h-80 p-3" ref={this.myRef}>
                            {this.state.chats.map((chat,ind) => {
                                return (
                                    <Message key={ind} id={this.state.matched_uid} user={this.state.user} chat={chat} />
                                )

                            })}
                        </div>
                        <form class="form-inline justify-content-center" onSubmit={this.handleSubmit}>
                            <div class="form-group col-sm-8">
                                <input class="form-control w-100"
                                    onChange={this.handleChange} value={this.state.content}/>
                                    {this.state.error ? <p>{this.state.writeError}</p> : null}
                            </div>
                            <div class="form-group col-sm-2">
                                <button type="submit" class="btn ml-4 btn-primary">Send</button>
                            </div>
                        </form>
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