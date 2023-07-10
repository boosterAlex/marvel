import { useState } from 'react';

function TestComponent() {
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(false);

    const handleClick = () => {
        setCount((count) => count + 1);
        setFlag((flag) => !flag);
    };
    console.log('render');

    return (
        <div>
            <button onClick={handleClick}>Next</button>
            <h1 style={{ color: flag ? 'blue' : 'black' }}>{count}</h1>
        </div>
    );
}

export default TestComponent;
