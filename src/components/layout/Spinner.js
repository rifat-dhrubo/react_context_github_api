import React, { Fragment } from 'react';

const Spinner = () => {
    return (
        <Fragment>
            <img
                // eslint-disable-next-line global-require
                src={require('./spinner.gif')}
                alt="Loading..."
                style={{
                    width: '200px',
                    margin: 'auto',
                    display: 'block',
                }}
            />
        </Fragment>
    );
};

export default Spinner;
