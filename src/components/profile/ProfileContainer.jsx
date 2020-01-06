import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getProfileThunk, putImageThunk, putProfileThunk, getStatusThunk, putStatusThunk } from '../../redux/reducers/profileReducer/profileReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.userId;
        if (!id) {
            id = this.props.data.id;
            if (!id) {
                this.props.history.push('/login');
            }
        }
        if (this.props.data.isAuth || this.props.match.params.userId) {
            this.props.getProfileThunk(id);
            this.props.getStatusThunk(id);
        }
    }
    
    componentDidUpdate(prop) {
        if (prop.match.params.userId !== this.props.match.params.userId ||
            prop.data.isAuth !== this.props.data.isAuth) {
            this.componentDidMount();
        }
    }

    render() {
        return <Profile isOwner={!this.props.match.params.userId} { ...this.props } />
    }
}

const mapStateToProps = state => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    data: state.auth.data
})

export default compose(
    withRouter,
    connect(mapStateToProps, {
    getProfileThunk,
    putImageThunk,
    putProfileThunk,
    getStatusThunk,
    putStatusThunk
}))(ProfileContainer);