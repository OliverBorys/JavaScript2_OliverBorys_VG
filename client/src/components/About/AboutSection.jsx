import PropTypes from "prop-types";

const AboutSection = ({ title, text, image, reverse }) => {
  return (
    <div className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center`}>
      <img src={image} alt={title} className="md:w-[50%]" />
      <p className="my-8 md:my-0 md:mx-8 text-center md:text-start">
        <strong>{title}</strong> {text}
      </p>
    </div>
  );
};

AboutSection.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  reverse: PropTypes.bool,
};

export default AboutSection;
