import { useState } from "react";

const HeroImageForm = () => {
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/update-hero-images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl1, imageUrl2 }),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-3">
      <div className="col-span-1 mr-4 mt-2 flex flex-col">
        <label htmlFor="heroImage1" className="font-medium text-md mb-2">
          Hero Image Left (URL):
        </label>
        <input
          type="text"
          id="heroImage1"
          value={imageUrl1}
          onChange={(e) => setImageUrl1(e.target.value)}
          className="text-sm border p-2 rounded"
          required
        />
      </div>
      <div className="col-span-1 mr-4 mt-2 flex flex-col">
        <label htmlFor="heroImage2" className="font-medium text-md mb-2">
          Hero Image Right (URL):
        </label>
        <input
          type="text"
          id="heroImage2"
          value={imageUrl2}
          onChange={(e) => setImageUrl2(e.target.value)}
          className="text-sm border p-2 rounded"
          required
        />
      </div>
      <div className="col-span-1 mt-4 mb-2">
        <button
          type="submit"
          className="p-2 font-medium border border-blue-500 bg-white text-blue-500 hover:bg-blue-500 hover:text-white transition-all text-center rounded"
        >
          Update Hero Images
        </button>
      </div>
    </form>
  );
};

export default HeroImageForm;
