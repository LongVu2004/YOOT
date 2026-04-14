import { useState }  from 'react';

function ToggleButton() {
    const [status, setStatus] = useState(false);

    const handleButton = () => {
        setStatus(!status);
    };
    
    return (
        <div>
            <div>Status: {status ? 'ON' : 'OFF'}</div>
            <button onClick={handleButton}>Toggle</button>
        </div>
    );
}

export default ToggleButton;