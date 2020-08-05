import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Matches from './pages/Matches.js'
import Chat from './pages/Chat.js'
import {auth} from './services/firebase';
import Signup from './pages/Signup.js'
import Help from './pages/Help.js'
import Login from './pages/Login.js'
import Home from './pages/Home.js'
import Settings from './pages/Settings.js'
import Sidebar from './components/Sidebar.js'
import './App.css';
import Contacts from './components/Contacts.js';

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
        <Router>
          <div class="w-100 d-flex align-items-stretch">
              <Sidebar/>
              <Contacts/>
              {/* <div> */}
              <main class="col-md-9 ml-sm-auto col-lg-10 px-4" role="main">
                <Switch>
                  <Route exact path="/" component={Home}/>
                  <PrivateRoute path="/chat/:uid"  
                  authenticated={this.state.authenticated} 
                  component={Chat}/>
                  <PrivateRoute path="/match" authenticated={this.state.authenticated} component={Matches}></PrivateRoute>
                  <PublicRoute path="/help" component={Help}/>
                  <PrivateRoute path="/settings" authenticated={this.state.authenticated} component={Settings}/>
                  <PublicRoute path="/login"  authenticated={this.state.authenticated} component={Login}/>
                  <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup}/>
                </Switch>
              </main>
            </div>
        </Router>
    )
  }
}



export default App;
