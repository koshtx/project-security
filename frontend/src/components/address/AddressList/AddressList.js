import React, { useState, useEffect } from 'react';
import { getAddresses, deleteAddress, addAddress, updateAddress } from '../../../services/addressService';
import AddressSearch from '../AddressSearch/AddressSearch';
import { useAuth } from '../../../hooks/useAuth';
import AddressForm from '../AddressForm/AddressForm';
import Modal from '../../common/Modal/Modal';
import styles from './AddressList.module.css';

function AddressList() {
  const [addresses, setAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    isPrimary: false
  });
  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setIsLoading(true);
      const data = await getAddresses();
      setAddresses(data);
      setFilteredAddresses(data);
    } catch (error) {
      setError('Failed to fetch addresses');
      setAddresses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = addresses.filter(address => 
      address.street.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAddresses(filtered);
  };

  const resetCurrentAddress = () => {
    setCurrentAddress({ street: '', city: '', state: '', zipCode: '', country: '', isPrimary: false });
  };
  
  const showSuccessMessage = (isEditing) => {
    console.log(`Dirección ${isEditing ? 'actualizada' : 'añadida'} con éxito`);
  };
  
  const handleAddressError = (error, isEditing) => {
    console.error('Error submitting address:', error);
    setError(`Error al ${isEditing ? 'actualizar' : 'añadir'} la dirección. Por favor, intente de nuevo.`);
  };

  const handleDelete = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await deleteAddress(addressId);
        fetchAddresses();
      } catch (error) {
        setError('Failed to delete address');
      }
    }
  };

  const addOrUpdateAddress = async (address, isEditing) => {
    if (isEditing) {
      return await updateAddress(address.id, address);
    } else {
      return await addAddress(user.id, address);
    }
  };

  const handleSubmitAddress = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const updatedAddress = await addOrUpdateAddress(currentAddress, isEditing);
      
      if (updatedAddress.isPrimary) {
        setAddresses(prevAddresses => updateAddressesPrimaryStatus(prevAddresses, updatedAddress.id));
      }
  
      setIsModalOpen(false);
      resetCurrentAddress();
      await fetchAddresses();
      showSuccessMessage(isEditing);
    } catch (error) {
      handleAddressError(error, isEditing);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentAddress(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const updateAddressesPrimaryStatus = (addresses, newPrimaryAddressId) => {
    return addresses.map(addr => ({
      ...addr,
      isPrimary: addr.id === newPrimaryAddressId
    }));
  };

  const openAddressModal = (address = null) => {
    if (address) {
      setCurrentAddress({...address, isPrimary: address.isPrimary || false});
      setIsEditing(true);
    } else {
      setCurrentAddress({ street: '', city: '', state: '', zipCode: '', country: '', isPrimary: false });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.addressList}>
      <h2>Address Management</h2>
      <AddressSearch onSearch={handleSearch} />
      <button onClick={() => openAddressModal()} className="add-btn">Añadir Nueva Dirección</button>
      <table className={styles.addressTable}>
        <thead>
          <tr>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>ZipCode</th>
            <th>Country</th>
            <th>isPrimary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAddresses.map(address => (
            <tr key={address.id}>
              <td>{address.street}</td>
              <td>{address.city}</td>
              <td>{address.state}</td>
              <td>{address.zipCode}</td>
              <td>{address.country}</td>
              <td>{address.isPrimary}</td>
              <td>
                <button onClick={() => openAddressModal(address)} className={styles.editButton}>Edit</button>
                <button onClick={() => handleDelete(address.id)} className={styles.deleteButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>{isEditing ? 'Editar Dirección' : 'Añadir Nueva Dirección'}</h3>
        <AddressForm
          address={currentAddress}
          onChange={handleAddressChange}
          onSubmit={handleSubmitAddress}
          isEditing={isEditing}
        />
      </Modal>
    </div>
  );
}

export default AddressList;