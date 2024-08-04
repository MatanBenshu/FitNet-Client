import React from 'react';
import './Page404.css';

function Page404() {
    return (
        <>
            <div className="page404">
                <div className='wrapper'>
                    <h1>404</h1>
                    <h2>Page Not Found</h2>
                    <p>The page you are looking for doesn't exist.</p>
                    <a href="/">Go Back to Homepage</a>
                </div>
            </div>
        </>
    );
}
export default Page404;