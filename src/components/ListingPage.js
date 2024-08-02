import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Listing.css";
import { useNavigate } from "react-router-dom";
const ListingPage = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/items");
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);

  const handlePlayClick = (id) => {
    console.log(`Play button clicked for item ${id}`);
    navigate(`/item/${id}`);
    // Add your play functionality here
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      await fetchItems(); // Fetch the updated list after deletion
      console.log(`Item with id ${id} deleted`);
    } catch (error) {
      console.error(`Failed to delete item with id ${id}:`, error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {items.map((item) => (
          <div className="col-4" key={item._id}>
            <h2>{item.title}</h2>
            <Link to={`/item/${item._id}`}>
              <img src={item.thumbnailUrl} alt={item.title} />
            </Link>
            <p></p>
            <div className="row  justify-content-center align-items-center">
              <div className="col">
                <button
                  className="btn btn-primary"
                  onClick={() => handlePlayClick(item._id)}
                >
                  <span>Play</span>
                </button>
              </div>
              <div className="col">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(item._id)}
                >
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingPage;
