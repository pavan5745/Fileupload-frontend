import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./VideosPage.css"; // Import the CSS file

const VideoPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };
    fetchItem();
  }, [id]);

  if (!item) return <div>Loading...</div>;

  return (
    <div className="containe">
      <h1>{item.title}</h1>
      <video controls autoPlay muted>
        <source src={item.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>Description: {item.description}</p>
    </div>
  );
};

export default VideoPage;
