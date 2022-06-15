import React from "react";
import Dog from "./Dog.js";
import "./DogList.css";
import PropTypes from "prop-types";

const DogList = (props) => {
  const dogComponents = props.dogData.map((dog) => {
    return (
      <Dog
        name={dog.name}
        favoriteToy={dog.favoriteToy}
        chipNumber={dog.chipNumber}
      ></Dog>
    );
  });
  return <ul>{dogComponents}</ul>;
};

DogList.propTypes = {
  dogData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DogList;
