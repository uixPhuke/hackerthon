import React, { useState } from "react";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // Handle file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle file upload (simulated)
  const handleUpload = () => {
    if (selectedImage) {
      console.log("Uploading:", selectedImage);
      // Here you would typically make an API call to upload the image
      // For this example, we are just logging the image to the console
    } else {
      console.log("No image selected");
    }
  };

  return (
    <div className="image-upload">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Selected"
          style={{ width: "300px", height: "auto", marginTop: "20px" }}
        />
      )}
      <button onClick={handleUpload} disabled={!selectedImage}>
        Upload Image
      </button>
    </div>
  );
};

export default ImageUpload;
