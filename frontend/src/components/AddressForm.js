import React, { useState } from 'react';
import AddressService from '../services/address.service';

const AddressForm = () => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AddressService.addAddress(address).then(
      (response) => {
        console.log('Address added successfully', response.data);
        // Reset form or redirect
      },
      (error) => {
        console.log('Error adding address:', error);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Address</h2>
      <div>
        <label>Street:</label>
        <input type="text" name="street" value={address.street} onChange={handleChange} required />
      </div>
      <div>
        <label>City:</label>
        <input type="text" name="city" value={address.city} onChange={handleChange} required />
      </div>
      <div>
        <label>State:</label>
        <input type="text" name="state" value={address.state} onChange={handleChange} required />
      </div>
      <div>
        <label>Zip Code:</label>
        <input type="text" name="zipCode" value={address.zipCode} onChange={handleChange} required />
      </div>
      <button type="submit">Add Address</button>
    </form>
  );
};

export default AddressForm;