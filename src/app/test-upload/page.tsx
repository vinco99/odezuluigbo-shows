"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";

export default function TestUploadPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");

  return (
    <main style={{ padding: "40px" }}>
      <h1>Cloudinary Upload Test</h1>

      <div style={{ marginTop: "30px" }}>
        <ImageUploader
          onUpload={(url, id) => {
            console.log("Cloudinary URL:", url);
            console.log("Cloudinary Public ID:", id);

            setImageUrl(url);
            setPublicId(id);
          }}
        />
      </div>

      {imageUrl && (
        <div style={{ marginTop: "30px" }}>
          <h2>Upload successful</h2>

          <img
            src={imageUrl}
            alt="Uploaded image"
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
              marginTop: "20px",
            }}
          />

          <p style={{ marginTop: "20px" }}>
            <strong>Public ID:</strong> {publicId}
          </p>

          <p>
            <strong>URL:</strong> {imageUrl}
          </p>
        </div>
      )}
    </main>
  );
}