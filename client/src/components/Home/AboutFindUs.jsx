import { useNavigate } from "react-router-dom";

const AboutFindUs = () => {
  const navigate = useNavigate();

  const sections = [
    {
      name: "About Us",
      img: "https://png.pngtree.com/background/20230516/original/pngtree-stock-image-of-a-clothing-rack-picture-image_2601916.jpg",
      link: "/about",
    },
    {
      name: "Find Us",
      img: "https://png.pngtree.com/background/20221109/original/pngtree-city-map-gps-navigation-with-location-pin-markers-picture-image_1953527.jpg",
      link: "https://maps.app.goo.gl/JTQBjAJAU5h5yc6j9",
      external: true,
    },
  ];

  const handleClick = (section) => {
    if (section.external) {
      window.open(section.link, "_blank");
    } else {
      navigate(section.link);
    }
  };

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {sections.map((section, index) => (
          <div
            key={index}
            className="relative w-full h-[300px] flex flex-col sm:col-span-2 lg:col-span-1 items-center group cursor-pointer"
            onClick={() => handleClick(section)}
          >
            <img
              src={section.img}
              alt={section.name}
              className="w-full h-full object-cover object-center rounded-2xl transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white text-2xl font-semibold rounded-2xl group-hover:bg-black/50 duration-300">
              {section.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutFindUs;
