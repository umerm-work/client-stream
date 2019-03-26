import React from "react";


class GoogleAuth extends React.Component{

    state = { isSignedIn : null };

    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId:'974245641494-q2819ibaplp5jp5uc59p8ecp0hl1jhle.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn : this.auth.isSignedIn.get() })
                this.auth.isSignedIn.listen(this.onAuthChange)
            });
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn : this.auth.isSignedIn.get() })
    }
    onSigInClick = () => {
        this.auth.signIn();
    };
    onSigOutClick = () => {
        this.auth.signOut();
    };
    renderAuthButton(){
        if( this.state.isSignedIn === null ){
            return null;
        } else if ( this.state.isSignedIn ){
            return (
            <button onClick={this.onSigOutClick} className="ui red google button">
                <i className="google icon" />
                Sign Out
            </button>
            );
        } else {
            return (
            <button onClick={this.onSigInClick} className="ui red google button">
                <i className="google icon" />
                Sign In with Google
            </button>
            );
        }
    }
    render(){
        return <div>{ this.renderAuthButton() }</div>;
    }
}

export default GoogleAuth;