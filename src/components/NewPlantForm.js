import React, { useState } from "react";

function NewPlantForm({ setPlants }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

  // POST Request to add new plant
  const postPlants = async (plant) => {
    try {
      const response = await fetch("http://localhost:6001/plants", {
        method: "POST",
        headers: {
          "Content-Type": "Application/JSON",
        },
        body: JSON.stringify(plant), //sends the plant data
      });
      const newPlant = await response.json();
      return newPlant; //returns the newly added plant
    } catch (error) {
      throw new Error(error);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPlant = {
      ...formData,
    };

    const addedPlant = await postPlants(newPlant);

    setPlants((prevPlants) => [...prevPlants, addedPlant]);

    setFormData({
      name: "",
      image: "",
      price: "",
    });
  };

  // Handle input changes (also as const)
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
