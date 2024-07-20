// AddressForm.js
import React from 'react';

const AddressForm = ({ address, onChange, onSubmit, isEditing }) => {
  return (
    <form onSubmit={onSubmit} className="address-form">
      <input
        type="text"
        name="street"
        value={address.street}
        onChange={onChange}
        placeholder="Calle"
        required
      />
      <input
        type="text"
        name="city"
        value={address.city}
        onChange={onChange}
        placeholder="Ciudad"
        required
      />
      <input
        type="text"
        name="state"
        value={address.state}
        onChange={onChange}
        placeholder="Estado"
        required
      />
      <input
        type="text"
        name="zipCode"
        value={address.zipCode}
        onChange={onChange}
        placeholder="Código Postal"
        required
      />
      <input
        type="text"
        name="country"
        value={address.country}
        onChange={onChange}
        placeholder="País"
        required
      />
      <div className="checkbox-container">
        <input
          type="checkbox"
          id="isPrimary"
          name="isPrimary"
          checked={address.isPrimary}
          onChange={onChange}
        />
        <label htmlFor="isPrimary">Establecer como dirección principal</label>
      </div>
      <button type="submit" className="submit-btn">
        {isEditing ? 'Actualizar Dirección' : 'Añadir Dirección'}
      </button>
    </form>
  );
};

export default AddressForm;