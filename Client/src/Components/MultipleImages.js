import React from "react";
import MultiImageInput from "react-multiple-image-input";

export function MultipleImages({ multiImages, setMultiImages, form, setForm }) {
  const handleMultipleImages = (newImages) => {
    setForm({
      ...form,
      multipleimages: newImages,
    });
    setMultiImages(newImages); // Optionally, you can update the multiImages state as well
  };
  return (
    <MultiImageInput
      theme={{
        background: "#ffffff",
        outlineColor: "#1a2b43",
        textColor: "rgba(255,255,255,0.6)",
        buttonColor: "#dac287",
      }}
      name="multipleImages"
      max={20}
      images={multiImages}
      setImages={handleMultipleImages}
      allowCrop={false}
    />
  );
}
