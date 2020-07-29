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
import Sidebar from './components/Sidebar.js'
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
                    {/* <Route exact path="/" Component={Profile}></Route> */}
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
