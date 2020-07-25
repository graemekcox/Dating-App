import React from 'react';
import Person from './Person.js'
import './App.css';

function Sidebar (){  
  return (
    <nav class="col-md-2 d-none d-md-block bg-light sidebar border-right">
      <div class="sidebar-sticky">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link" href="#">
              <svg width="32" height="32" 
               viewBox="0 0 32 32" class="bi bi-chat-dots-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
              </svg>
              Conversations
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <svg width="32" height="32" viewBox="0 0 32 32" class="bi bi-gear-wide-connected" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 1 0 0-9.995 4.998 4.998 0 0 0 0 9.996z"/>
                <path fill-rule="evenodd" d="M7.375 8L4.602 4.302l.8-.6L8.25 7.5h4.748v1H8.25L5.4 12.298l-.8-.6L7.376 8z"/>
              </svg>
              Settings
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );

}

class App extends React.Component {
  render() {
    return (
      <div class="cover-container-fluid">
        <nav class="navbar navbar-dark bg-dark box-shadow">
              <div class="navbar-brand d-flex align-items-center">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart-half m-2" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 1.314C3.562-3.248-7.534 4.735 8 15V1.314z"/>
                  <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>
                <strong>Dating App</strong>
              </div>
              <button class="navbar-toggler" type="button" data-toggle="collapse">
                <span class="navbar-toggler-icon"/>
              </button>
          </nav>
        <div class="row">
          <Sidebar/>
        <main class="col-md-10 ml-sm-auto col-lg-10 px-4" role="main">
          <section class="text-center">
            <p>
                Here is a description on how to use the site
              </p>
          </section>
          <section class="jumbotron text-center">
            <div class="container"> 
              {/* This is where the Person class can go */}
              <Person/>
              {/* <img src="data:image/jpeg;base64,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"></img> */}
            </div>
          </section>
        </main>
        </div>
      </div>

    )
  }
}

export default App;
