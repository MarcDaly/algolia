import React, { useState } from "react";
import "../Styles/Components/AddRestaurantForm.scss";

const AddRestaurantForm = (props) => {
    const [formValues, setFormValues] = useState({
        name: "",
        address: "",
        area: "",
        city: "",
        country: "",
        state: "",
        phone: "",
        food_type: "",
    });

    function handleInputChange(e) {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
        console.log(formValues, "fv");
    }

    function handleSubmitForm(e) {
        e.preventDefault();
        props.algoliaIndex.saveObject(formValues, {
            autoGenerateObjectIDIfNotExist: true,
        });
        for (const value in formValues) {
            setFormValues((prevState) => ({ ...prevState, [value]: "" }));
            console.log(value, "vv", formValues, "vvv");
        }
    }

    return (
        <div className="form-container">
            <form onSubmit={(e) => handleSubmitForm(e)}>
                <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    placeholder="Restaurant Name"
                    onChange={(e) => handleInputChange(e)}
                    required
                />
                <input
                    type="text"
                    name="address"
                    value={formValues.address}
                    placeholder="Restaurant Address"
                    onChange={(e) => handleInputChange(e)}
                    required
                />
                <input
                    type="text"
                    name="area"
                    value={formValues.area}
                    placeholder="Area"
                    onChange={(e) => handleInputChange(e)}
                    required
                />
                <input
                    type="text"
                    name="city"
                    value={formValues.city}
                    placeholder="City"
                    onChange={(e) => handleInputChange(e)}
                    required
                />
                <input
                    type="text"
                    name="state"
                    value={formValues.state}
                    placeholder="State"
                    onChange={(e) => handleInputChange(e)}
                    required
                />
                <input
                    type="text"
                    name="country"
                    value={formValues.country}
                    placeholder="Country"
                    onChange={(e) => handleInputChange(e)}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    value={formValues.phone}
                    placeholder="Phone Number"
                    onChange={(e) => handleInputChange(e)}
                    required
                />
                <input
                    type="text"
                    name="food_type"
                    value={formValues.food_type}
                    placeholder="Cuisine"
                    onChange={(e) => handleInputChange(e)}
                    required
                />
                <button type="submit" className="ais-RefinementList-showMore">
                    Add Restaurant
                </button>
            </form>
        </div>
    );
};

export default AddRestaurantForm;
