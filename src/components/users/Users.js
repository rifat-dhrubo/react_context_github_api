import React, { useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    girdGap: '1rem',
};

const Users = () => {
    const githubContext = useContext(GithubContext);

    const { loading, users } = githubContext;

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

export default Users;
