import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import {clearAuth, authTimerAlert} from '../actions/auth';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
        this.firstTimer();
    }


firstTimer(){
    console.log('the timer started');
    const alert = "Session is about to expire.  CLick anywhere to extend."
    const callback = () => this.props.dispatch(authTimerAlert(alert));
    window.setTimeout(callback, 7 * 1000);
}

secondTimer(){
    const callback = () => this.props.dispatch(clearAuth());
    window.setTimeout(callback, 3 * 1000);
} 

    render() {

        let alert;
        if(this.props.alert){
            this.secondTimer(); 
            alert = <div className='alert'><h2>{this.props.alert}</h2></div>
           
        }

        return (
        
            <div className="dashboard">
                    {alert}
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
        protectedData: state.protectedData.data,
        alert: state.auth.alert
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));