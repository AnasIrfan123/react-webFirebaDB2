// // useError.js
// import { useState } from "react";

// function useError() {
//     const [error, setError] = useState('');

//     function showError(message) {
//         setError(message);

//         setTimeout(() => {
//             setError('');
//         }, 2000);   
//     }

//     // return [error, showError];
//     return showError;
// }

// export default useError;




import React, { useState, useEffect } from 'react';

function Error({ errorMessage }) {
    const [error, setError] = useState('');

    useEffect(() => {
        if (errorMessage) {
            setError(errorMessage);
            const timer = setTimeout(() => {
                setError('');
            }, 4000);

            return () => clearTimeout(timer); // Clean up the timer
        }
    }, [errorMessage]);

    return (
        <div>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default Error;

