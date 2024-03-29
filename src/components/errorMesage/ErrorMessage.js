import img from './error.gif';

const ErrorMessage = () => {
    // return <img src={process.env.PUBLIC_URL + '/error.gif'} />;
    return (
        <img
            style={{
                display: 'block',
                width: 250,
                height: 250,
                objectFit: 'contain',
                margin: '0 auto',
            }}
            src={img}
            alt='Error'
        />
    );
};

export default ErrorMessage;
