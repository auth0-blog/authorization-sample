import React, {useState} from 'react';
import auth0Client from '../Auth';
import jwtDecode from 'jwt-decode';

function Home() {
  const [authState, setAuthState] = useState({
    signedIn: false,
    profile: null,
  });

  async function handleAuthentication() {
    await auth0Client.handleAuthentication();
    setAuthState({
      signedIn: auth0Client.isAuthenticated(),
      profile: auth0Client.getProfile(),
    });
    window.history.replaceState({}, document.title, '/');
  }

  async function silentAuth() {
    await auth0Client.silentAuth();
    setAuthState({
      signedIn: auth0Client.isAuthenticated(),
      profile: auth0Client.getProfile(),
    });
  }

  async function issueRequest() {
    const response = await fetch('/api/', {
      headers: {
        'Authorization': `Bearer ${auth0Client.getAccessToken()}`,
      },
    });
    console.log(response.json());
  }

  return (
    <>
      <button onClick={auth0Client.signIn}>Sign In</button>
      <button onClick={auth0Client.signOut}>Sign Out</button>
      <button onClick={handleAuthentication}>Handle Authentication</button>
      <button onClick={silentAuth}>Check Session</button>
      <button onClick={issueRequest}>Issue Request</button>
      <div className='profile'>
        {authState.signedIn && (
          <>
            <h2>ID Token</h2>
            <pre>{JSON.stringify(jwtDecode(auth0Client.getIdToken()), null, 2)}</pre>
            <h2>Access Token</h2>
            <pre>{JSON.stringify(jwtDecode(auth0Client.getAccessToken()), null, 2)}</pre>
          </>
        )}
      </div>
    </>
  )
}

export default Home;
