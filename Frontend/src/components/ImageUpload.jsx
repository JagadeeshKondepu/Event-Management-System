import { useState } from 'react';

const ImageUpload = ({ currentImage, onImageChange }) => {
  const [preview, setPreview] = useState(currentImage || '');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPreview(base64String);
        onImageChange(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePlaceholder = (text) => {
    const colors = ['#ff6b35', '#ffd700', '#ff69b4', '#40df9f', '#8b5cf6', '#ff9500', '#6699cc'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const svg = `
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${color}"/>
        <text x="50%" y="50%" font-size="16" fill="white" text-anchor="middle" dy=".3em">${text}</text>
      </svg>
    `;
    
    const base64 = `data:image/svg+xml;base64,${btoa(svg)}`;
    setPreview(base64);
    onImageChange(base64);
  };

  return (
    <div className="image-upload">
      <div className="image-preview">
        {preview ? (
          <img src={preview} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100px', height: '100px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            No Image
          </div>
        )}
      </div>
      
      <div className="upload-controls">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginBottom: '0.5rem' }}
        />
        <button
          type="button"
          onClick={() => generatePlaceholder('Product')}
          style={{
            background: '#6699cc',
            color: 'white',
            border: 'none',
            padding: '0.5rem',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.8rem'
          }}
        >
          Generate Placeholder
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;