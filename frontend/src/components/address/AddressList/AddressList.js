import React, { useState, useEffect } from 'react';
import { getAddresses, deleteAddress } from '../../../services/addressService';
import AddressSearch from '../AddressSearch/AddressSearch';
import AddressForm from '../AddressForm/AddressForm';
import Modal from '../../common/Modal/Modal';
import styles from './AddressList.module.css';

function AddressList() {
  const [addresses, setAddresses] = useState([]);
  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

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

  const handleEdit = (address) => {
    setSelectedAddress(address);
    setShowModal(true);
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

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAddress(null);
  };

  const handleSave = () => {
    fetchAddresses();
    handleCloseModal();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.addressList}>
      <h2>Address Management</h2>
      <AddressSearch onSearch={handleSearch} />
      <button onClick={() => setShowModal(true)} className={styles.addButton}>Add New Address</button>
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
                <button onClick={() => handleEdit(address)} className={styles.editButton}>Edit</button>
                <button onClick={() => handleDelete(address.id)} className={styles.deleteButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal} onClose={handleCloseModal}>
        <AddressForm address={selectedAddress} onSave={handleSave} />
      </Modal>
    </div>
  );
}

export default AddressList;