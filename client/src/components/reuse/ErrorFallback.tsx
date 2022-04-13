import React, {FC} from 'react';

interface IErrorFallback {
    error?: Error;
}

const ErrorFallback: FC<IErrorFallback> = ({error}) => {

    console.log('LOOLL')
    return (
        <div className="error_fallback_wrapper">
            <div className="error_fallback_wrapper">{error?.message}</div>
        </div>
    );
};

export default ErrorFallback;
