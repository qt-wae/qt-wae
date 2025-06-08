import React, { useState } from "react";
import ReactDOM from "react-dom";

function ChartAnalyzer() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState("");

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("http://localhost:8000/analyze", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        setResult(data["القرار"]);
    };

    return (
        <div>
            <h1>محلل الشارت</h1>
            <input type="file" onChange={e => setFile(e.target.files[0])} />
            <button onClick={uploadImage}>تحليل</button>
            {result && <h2>النتيجة: {result}</h2>}
        </div>
    );
}

ReactDOM.render(<ChartAnalyzer />, document.getElementById("root"));