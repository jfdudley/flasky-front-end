import React from "react";
import "./Dog.css";
import PropTypes from "prop-types";

const Dog = (props) => {
  return (
    <li>
      <h3>{props.name}</h3>
      <h4>Favorite Toy: {props.favoriteToy}</h4>
      <h4>Chip Number: {props.chipNumber}</h4>
      <button>Pet Dog</button>
      <button>Give Treat</button>
      <button>Take on Walk</button>
    </li>
  );
};

Dog.propTypes = {
  name: PropTypes.string.isRequired,
  favoriteToy: PropTypes.string,
  chipNumber: PropTypes.string,
};

export default Dog;
