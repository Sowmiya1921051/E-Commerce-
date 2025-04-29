import React, { useState } from 'react';
import axios from 'axios';

function Images() {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setMessage('Please select an image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', image); // Append image to FormData

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);
      setImageUrl(response.data.filePath); // Save the uploaded file path
    } catch (error) {
      setMessage('Failed to upload image');
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload an Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
      {message && <p>{message}</p>}
      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={`http://localhost:5000${imageUrl}`} alt="Uploaded" width="300" />
        </div>
      )}
    </div>
  );
}

export default Images;
