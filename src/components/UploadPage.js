// UploadPage.js
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./UploadPage.css"; // Import the CSS file
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title.toUpperCase());
    formData.append("description", data.description);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("video", data.video[0]);
    toast("Uploading data......Please wait");
    reset();
    try {
      await axios.post("http://localhost:5000/upload", formData);
      toast("Upload successful");
    } catch (error) {
      toast.error("Error occured:"`{error}`);
    }
  };

  return (
    <div className="wrapper">
      <div className="contain">
        <ToastContainer></ToastContainer>
        <h2>Upload Media</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            {...register("title", {
              required: "Title is required",
              maxLength: {
                value: 50,
                message: "Title cannot exceed 50 characters",
              },
            })}
          />
          {errors.title && <p className="error">{errors.title.message}</p>}

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
              maxLength: {
                value: 200,
                message: "Description cannot exceed 200 characters",
              },
            })}
          />
          {errors.description && (
            <p className="error">{errors.description.message}</p>
          )}

          <label htmlFor="thumbnail">Upload Thumbnail</label>
          <input
            type="file"
            id="thumbnail"
            accept="image/png, image/jpeg"
            {...register("thumbnail", { required: "Thumbnail is required" })}
          />
          {errors.thumbnail && (
            <p className="error">{errors.thumbnail.message}</p>
          )}

          <label htmlFor="video">Upload Video</label>
          <input
            type="file"
            id="video"
            accept="video/mp4, video/mpeg, video/x-msvideo"
            {...register("video", { required: "Video is required" })}
          />
          {errors.video && <p className="error">{errors.video.message}</p>}

          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
