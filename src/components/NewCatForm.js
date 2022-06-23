import React, { useState } from "react";

const kDefaultFormState = {
    name: '',
    color: '',
    personality: '',
};

// const NewCatForm = (props) => {
const NewCatForm = ({ onCatDataReady }) => {

    const [formData, setFormData] = useState(kDefaultFormState);

    const handleChange = (event) => {
        // console.log(event.target.value);
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        const newFormData = { ...formData, [fieldName]: fieldValue };
        // newFormData[fieldName] = fieldValue;

        setFormData(newFormData);

        // setFormData(oldData => {});
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        onCatDataReady(formData);

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

export default NewCatForm;