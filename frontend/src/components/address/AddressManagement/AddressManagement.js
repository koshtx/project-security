import React, { useState, useEffect } from 'react';
import { getUserAddresses, addAddress, updateAddress, deleteAddress, setPrimaryAddress } from '../../../services/addressService';
import { useAuth } from '../../../hooks/useAuth';
import Modal from '../../common/Modal/Modal';
import './AddressManagement.css';

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentAddress, setNewAddress] = useState({ street: '', city: '', state: '', zipCode: '', country: ''});
  const [error, setError] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setIsLoading(true);
      const data = await getUserAddresses(user.id)
      setAddresses(data);
    } catch (error) {
      setError('Failed to fetch user profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    if (editingAddress) {
      setEditingAddress({ ...editingAddress, [name]: value });
    } else {
      setNewAddress({ ...currentAddress, [name]: value });
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      currentAddress.userId = user.id;
      await addAddress(currentAddress);
      setNewAddress({ street: '', city: '', state: '', zipCode: '', country: '' });
      await fetchAddresses();
      alert('Dirección añadida con éxito');
    } catch (error) {
      console.error('Error adding address:', error);
      alert('Error al añadir la dirección');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await deleteAddress(addressId);
      await fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleSetPrimaryAddress = async (addressId) => {
    try {
      await setPrimaryAddress(user.id, addressId);
      await fetchAddresses();
    } catch (error) {
      console.error('Error setting default address:', error);
    }
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    try {
      await updateAddress(editingAddress.id, editingAddress);
      setIsModalOpen(false);
      setEditingAddress(null);
      await fetchAddresses();
      alert('Dirección actualizada con éxito');
    } catch (error) {
      console.error('Error updating address:', error);
      alert('Error al actualizar la dirección');
    }
  };

  const openEditModal = (address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="address-management">
      <h2>Mis Direcciones</h2>
      <div className="address-list">
        {addresses.map(address => (
          <div key={address.id} className="address-item">
            <p>{address.street}, {address.city}, {address.state} {address.zipCode}</p>
            <div className="address-actions">
              <button onClick={() => handleSetPrimaryAddress(address.id)} className={address.isPrimary ? 'default-btn' : 'set-default-btn'}>
                {address.isPrimary ? 'Predeterminada' : 'Establecer como predeterminada'}
              </button>
              <button onClick={() => openEditModal(address)} className="edit-btn">Editar</button>
              <button onClick={() => handleDeleteAddress(address.id)} className="delete-btn">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
      <h3>Añadir nueva dirección</h3>
      <form onSubmit={handleAddAddress} className="address-form">
        <input
          type="text"
          name="street"
          value={currentAddress.street}
          onChange={handleAddressChange}
          placeholder="Calle"
          required
        />
        <input
          type="text"
          name="city"
          value={currentAddress.city}
          onChange={handleAddressChange}
          placeholder="Ciudad"
          required
        />
        <input
          type="text"
          name="state"
          value={currentAddress.state}
          onChange={handleAddressChange}
          placeholder="Estado"
          required
        />
        <input
          type="text"
          name="zipCode"
          value={currentAddress.zipCode}
          onChange={handleAddressChange}
          placeholder="Código Postal"
          required
        />
        <button type="submit" className="add-btn">Añadir Dirección</button>
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Editar Dirección</h3>
        <form onSubmit={handleUpdateAddress} className="address-form">
          <input
            type="text"
            name="street"
            value={editingAddress?.street || ''}
            onChange={handleAddressChange}
            placeholder="Calle"
            required
          />
          <input
            type="text"
            name="city"
            value={editingAddress?.city || ''}
            onChange={handleAddressChange}
            placeholder="Ciudad"
            required
          />
          <input
            type="text"
            name="state"
            value={editingAddress?.state || ''}
            onChange={handleAddressChange}
            placeholder="Estado"
            required
          />
          <input
            type="text"
            name="country"
            value={editingAddress?.country || ''}
            onChange={handleAddressChange}
            placeholder="Pais"
            required
          />
          <input
            type="text"
            name="zipCode"
            value={editingAddress?.zipCode || ''}
            onChange={handleAddressChange}
            placeholder="Código Postal"
            required
          />
          <button type="submit" className="update-btn">Actualizar Dirección</button>
        </form>
      </Modal>
    </div>
  );
};

export default AddressManagement;