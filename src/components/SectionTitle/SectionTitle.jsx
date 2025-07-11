const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="md:w-3/12 mx-auto text-center my-7">
      <p className="text-yellow-600 mb-2">...{subHeading}...</p>
      <h3 className="text-4xl uppercase border-y-2 py-4">{heading}</h3>
    </div>
  );
};

export default SectionTitle;
