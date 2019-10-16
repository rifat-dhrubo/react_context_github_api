import React from 'react';
import PropTypes from 'prop-types';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    girdGap: '1rem',
};

const Users = ({ users, loading }) => {
    if (loading) return <Spinner />;
    // eslint-disable-next-line no-else-return
    else {
        return (
            <div style={userStyle}>
                {users.map((user) => {
                    return <UserItem key={user.id} user={user} />;
                })}
            </div>
        );
    }
};
Users.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
};
export default Users;
