import { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

  const uploadImage = async () => {
    if (!image) return alert("Select an image");

    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch("http://127.0.0.1:5000/ocr", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setText(data.text);
  };

  return (
    <div className="container">
      <h1>OCR Image to Text</h1>

      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={uploadImage}>Extract Text</button>

      <textarea rows="15" value={text} readOnly />
    </div>
  );
}

export default App;
