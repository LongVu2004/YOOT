import { useState } from "react";

function InputPreview() {
    const [text, setText] = useState("");

    const handleClear = () => setText("");

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Nhập gì đó..."
            />
            <button onClick={handleClear} style= {{ cursor: 'pointer' }}>Clear</button>
            <p>Preview: {text}</p>
        </div>
    )
}

export default InputPreview;