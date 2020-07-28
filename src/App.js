import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch, Redirect} from 'react-router-dom';
import Person from './components/Person.js'
import Chat from './pages/Chat.js'
import {auth} from './services/firebase';
import Signup from './pages/Signup.js'
import Help from './pages/Help.js'
import Login from './pages/Login.js'
import Home from './pages/Home.js'
import Navbar from  './components/Navbar.js'
import './App.css';

function Profile() {
  return (
    <div>
      <h1> This is your profile</h1>
    </div>
  )
}

function Settings(){
  return(
    <section class="text-center">
      <h1>TBD</h1>
    </section>
  )
}

function Sidebar (){  
  return (
    <nav class="col-md-2 d-none d-md-block bg-light sidebar border-right">
      <div class="sidebar-sticky">
        <ul class="nav flex-column">
          <li class="nav-item">
              <svg width="32" height="32" viewBox="0 0 32 32" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
              </svg>
              <Link to='/match'>Find a match</Link>
          </li>
          <li class="nav-item">
            <svg width="32" height="32" 
              viewBox="0 0 32 32" class="bi bi-chat-dots-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg>
            <Link to='/login'>Login</Link>
          </li>
          <li class="nav-item">
            <svg width="32" height="32" 
              viewBox="0 0 32 32" class="bi bi-chat-dots-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg>
            <Link to='/chat'>Conversations</Link>
          </li>
          <li class="nav-item">
            <svg width="32" height="32" viewBox="0 0 32 32" class="bi bi-gear-wide-connected" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 1 0 0-9.995 4.998 4.998 0 0 0 0 9.996z"/>
              <path fillRule="evenodd" d="M7.375 8L4.602 4.302l.8-.6L8.25 7.5h4.748v1H8.25L5.4 12.298l-.8-.6L7.376 8z"/>
            </svg>
            <Link to="/settings">Settings</Link>
          </li>
          <li class="nav-item">
            <svg width="32" height="32" viewBox="0 0 32 32" class="bi bi-info-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
              <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/>
              <circle cx="8" cy="4.5" r="1"/>
            </svg>

            <Link to="/help">Help</Link>
          </li>
        </ul>
      </div>
    </nav>
  );

}

// This helps block routes that requir athentication
function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
      }
    />
  );
}

function PublicRoute({ component: Component, authenticated, ...rest}) {
  return (
    <Route {...rest}
    render={(props) => authenticated === false
    ? <Component {...props} />
    : <Redirect to='/chat' />}
  />
  )
}


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    }
  }

  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false
        });
      }
    });
  }
  render() {
    return this.state.loading === true ? (
      <div className="spinner-border text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    ) : (
      // <div class="cover-container-fluid">
        <Router>
          <Navbar/>
          <div class="container-fluid">
            <div class="row">
                <Sidebar/>
                <main class="col-md-9 ml-sm-auto col-lg-10 px-4" role="main">
                  <Switch>
                    <Route exact path="/" component={Home}/>
                    <PrivateRoute path="/chat"  
                    authenticated={this.state.authenticated} 
                    component={Chat}/>
                    <PrivateRoute path="/match" authenticated={this.state.authenticated} component={Person}></PrivateRoute>
                    <Route path="/help" component={Help}/>
                    <Route path="/settings" component={Settings}></Route>
                    <Route exact path="/" Component={Profile}></Route>
                    <PublicRoute path="/login" 
                    authenticated={this.state.authenticated} component={Login}/>
                    <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup}/>
                  </Switch>
                </main>
              </div>
          </div>   
        </Router>
      // </div>

    )
  }
}



export default App;
