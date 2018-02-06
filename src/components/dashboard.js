import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import {clearAuth} from '../actions/auth';

let message;

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
        this.firstTimer();
    }

// timerStuff(){
//     startTimer();

// }
firstTimer(){
    console.log('the timer started');
    const callback = function() {
        this.secondTimer();
        message = <p> Click something to stay logged in </p>
        return;
    }
    window.setTimeout(callback, 10 * 1000);

}

secondTimer(){
    const callback = () => this.props.dispatch(clearAuth());
    window.setTimeout(callback, 5 * 1000);
//    window.setTimeout(this.props.dispatch(clearAuth()), 5 * 1000)
} 

// }
// startTimer() {
//       window.setTimeout(this.props.dispatch(action), 10 * 1000);
//     }

    render() {
        return (
            <div className="dashboard">
                {message}
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div>
                <div className="dashboard-protected-data">
                    Protected data: {this.props.protectedData}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));