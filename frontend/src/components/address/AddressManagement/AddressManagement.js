import React, { useState, useEffect, useCallback } from 'react';
import { getUserAddresses, addAddress, updateAddress, deleteAddress, setPrimaryAddress } from '../../../services/addressService';
import { useAuth } from '../../../hooks/useAuth';
import Modal from '../../common/Modal/Modal';
import Pagination from '../../common/Pagination';
import './AddressManagement.css';
import AddressForm from '../AddressForm/AddressForm';

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    isPrimary: false
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [addressesPerPage] = useState(1);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const indexOfLastAddress = currentPage * addressesPerPage;
  const indexOfFirstAddress = indexOfLastAddress - addressesPerPage;
  const currentAddresses = addresses.slice(indexOfFirstAddress, indexOfLastAddress);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const fetchAddresses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getUserAddresses(user.id);
      setAddresses(data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setError('Error al cargar las direcciones. Por favor, intente de nuevo más tarde.');
      setAddresses([]);
    } finally {
      setIsLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

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

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta dirección?')) {
      setIsLoading(true);
      setError(null);
      try {
        await deleteAddress(addressId);
        await fetchAddresses();
      } catch (error) {
        console.error('Error deleting address:', error);
        setError('Error al eliminar la dirección. Por favor, intente de nuevo.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSetPrimaryAddress = async (addressId) => {
    setIsLoading(true);
    setError(null);
    try {
      await setPrimaryAddress(user.id, addressId);
      await fetchAddresses();
    } catch (error) {
      console.error('Error setting primary address:', error);
      setError('Error al establecer la dirección principal. Por favor, intente de nuevo.');
    } finally {
      setIsLoading(false);
    }
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

  return (
    <div className="address-management">
      <h2>Mis Direcciones</h2>
      {isLoading ? (
        <div className="loading">Cargando direcciones...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : currentAddresses.length > 0 ? (
        <div className="address-list">
          {currentAddresses.map(address => (
          <div key={address.id} className="address-item">
            <p>{address.street}, {address.city}, {address.state} {address.zipCode}, {address.country}</p>
            <div className="address-actions">
              <button onClick={() => handleSetPrimaryAddress(address.id)} className={address.isPrimary ? 'primary-btn' : 'set-primary-btn'}>
                {address.isPrimary ? 'Dirección Principal' : 'Establecer como Principal'}
              </button>
              <button onClick={() => openAddressModal(address)} className="edit-btn">Editar</button>
              <button onClick={() => handleDeleteAddress(address.id)} className="delete-btn">Eliminar</button>
            </div>
          </div>
        ))}
        </div>
      ) : (
        <p>No hay direcciones disponibles.</p>
      )}
      <Pagination
        addressesPerPage={addressesPerPage}
        totalAddresses={addresses.length}
        currentPage={currentPage}
        paginate={paginate}
      />
      <button onClick={() => openAddressModal()} className="add-btn">Añadir Nueva Dirección</button>
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
};

export default AddressManagement;