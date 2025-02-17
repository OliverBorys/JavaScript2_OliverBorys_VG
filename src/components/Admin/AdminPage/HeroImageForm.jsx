const HeroImageForm = () => {
    return (
      <form action="/admin/update-hero-images" method="POST" encType="multipart/form-data" className="grid md:grid-cols-3">
        <div className="col-span-1 mr-4 mt-2 flex flex-col">
          <label htmlFor="heroImage1" className="font-medium text-md mb-2">
            Hero Image Left:
          </label>
          <input type="file" name="heroImages" id="heroImage1" className="text-sm" />
        </div>
        <div className="col-span-1 mr-4 mt-2 flex flex-col">
          <label htmlFor="heroImage2" className="font-medium text-md mb-2">
            Hero Image Right:
          </label>
          <input type="file" name="heroImages" id="heroImage2" className="text-sm" />
        </div>
        <div className="col-span-1 mt-4 mb-2">
          <button type="submit" className="p-2 font-medium border border-blue-500 bg-white text-blue-500 hover:bg-blue-500 hover:text-white transition-all text-center rounded">
            Update Hero Images
          </button>
        </div>
      </form>
    );
  };
  
  export default HeroImageForm;
  