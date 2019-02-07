import React, { Component } from 'react';
import auth0Client from './Auth';
import jwtDecode from 'jwt-decode';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      profile: null,
    };

    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.silentAuth = this.silentAuth.bind(this);
    this.issueRequest = this.issueRequest.bind(this);
  }

  async handleAuthentication() {
    await auth0Client.handleAuthentication();
    this.setState({
      signedIn: auth0Client.isAuthenticated(),
      profile: auth0Client.getProfile(),
    });
    window.history.replaceState({}, document.title, '/');
  }

  async silentAuth() {
    await auth0Client.silentAuth();
    this.setState({
      signedIn: auth0Client.isAuthenticated(),
      profile: auth0Client.getProfile(),
    });
  }

  async issueRequest() {
    const response = await fetch('/api/', {
      headers: {
        'Authorization': `Bearer ${auth0Client.getAccessToken()}`,
      },
    });
    console.log(response.json());
  }

  render() {
    return (
      <div>
        <button onClick={auth0Client.signIn}>Sign In</button>
        <button onClick={auth0Client.signOut}>Sign Out</button>
        <button onClick={this.handleAuthentication}>Handle Authentication</button>
        <button onClick={this.silentAuth}>Check Session</button>
        <button onClick={this.issueRequest}>Issue Request</button>
        <div className="profile">
          {this.state.signedIn && (
            <>
              <h2>ID Token</h2>
              <pre>{JSON.stringify(jwtDecode(auth0Client.getIdToken()), null, 2)}</pre>
              <h2>Access Token</h2>
              <pre>{JSON.stringify(jwtDecode(auth0Client.getAccessToken()), null, 2)}</pre>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default App;
