import React, { useState } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line object-curly-newline
const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {
    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (text === '') {
            setAlert('Please Enter Something...', 'light');
        } else {
            searchUsers(text);
            setText('');
        }
    };

    const onChange = (e) => {
        setText(e.target.value);
        // getting the passed down event and setting the value for it
    };

    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input
                    type="text"
                    name="text"
                    placeholder="Search Users..."
                    value={text}
                    onChange={onChange} // handling some event
                />
                <input
                    type="submit"
                    value="Search"
                    className="btn btn-dark btn-block"
                />
            </form>
            {showClear && (
                <button
                    className="btn btn-light btn-block"
                    onClick={clearUsers}
                    type="button"
                >
                    Clear
                </button>
            )}
        </div>
    );
};

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
};

export default Search;
