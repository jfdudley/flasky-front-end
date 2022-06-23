import React, { useState } from "react";
import PropTypes from "prop-types";

// It can be convenient to declare an object of function to represent
// or build the default values for the state when we use an object
// as the state so that it's easy to set/reset
const kDefaultFormState = {
    name: '',
    color: '',
    personality: '',
};

// We could declare NewCatForm using a single variable for the props, and
// either access the field using props.nameOfField, or destructure them
// within the component. But doing the destructuring in the argument list
// can help make the expected props more readable. Just don't forget the
// {}, otherwise the passed in props object will simply fill the value
// of the first parameter, rather than being destructured into multiple
// separate values.
//
// const NewCatForm = (props) => {
//   do something with props.onCatDataReady...
const NewCatForm = ({ onCatDataReady }) => {

    const [formData, setFormData] = useState(kDefaultFormState);

    const handleChange = (event) => {
        // console.log(event.target.value);
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        // the [] around fieldName is not related to arrays. It's
        // telling JS to treat the key expression as JS code rather
        // than a plain string, so [fieldName]: means to use the value
        // stored in fieldName as the key, rather than literally
        // "fieldName"

        const newFormData = { ...formData, [fieldName]: fieldValue };
        setFormData(newFormData);

        // there's no async code going on here, so the need for the 
        // functional set state is less pronounced here, but we _are_
        // updating state based on the last value of state. So if we
        // wanted to use the functional style, we could write
        //
        // setFormData(oldFormData => ({ ...oldFormData, [fieldName]: fieldValue }));
        //
        // Notice the () around the object. Without those, JS would interpret
        // the {} as the braces around the function body rather than the
        // start of an object literal.
    };

    const handleSubmit = (event) => {
        // prevent the default browser submit action
        event.preventDefault();

        // use the supplied callback to notify the outside world that we
        // have data ready to be used
        onCatDataReady(formData);

        // reset the form back to its default values
        setFormData(kDefaultFormState);
    };

    return <div className="NewCatForm">
        <form onSubmit={handleSubmit}>
            <h2>Register a Cat</h2>
            <div>
            <label>Name</label>
            <input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange}></input>
            </div>
            {/* Notice how repetitive each of these div/label/input sections
                is. We could think about how to represent these inputs
                in an array of data, and iterate through it to generate
                this markup! */}
            <div>
            <label>Color</label>
            <input 
                type="text" 
                name="color" 
                value={formData.color}
                onChange={handleChange}></input>
            </div>
            <div>
            <label>Personality</label>
            <input 
                type="text" 
                name="personality" 
                value={formData.personality}
                onChange={handleChange}></input>
            </div>
            <div>
                <input type="submit" value="Add Cat"></input>
            </div>

        </form>
    </div>
};

NewCatForm.propTypes = {
    onCatDataReady: PropTypes.func.isRequired,
};

export default NewCatForm;