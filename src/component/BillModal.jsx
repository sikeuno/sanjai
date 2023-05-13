import React, { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';

const BillModal = ({ bill, onSave, onCancel, db }) => {
  const [updatedBill, setUpdatedBill] = useState({ ...bill });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedBill((prevBill) => ({ ...prevBill, [name]: value }));
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();
    try {
      const billDocRef = doc(db, 'user', updatedBill.id);
      await updateDoc(billDocRef, updatedBill);
      onSave(updatedBill);
    } catch (error) {
      console.error('Error updating bill:', error);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-black rounded-lg shadow-lg p-6 w-full md:max-w-md">
        <h3 className="text-xl font-bold text-white mb-4">Edit Bill</h3>
        <form onSubmit={handleSaveChanges}>
          <div className="mb-4">
            <label htmlFor="sno" className="block text-white font-semibold mb-1">S. No:</label>
            <input type="text" name="sno" value={updatedBill.sno} onChange={handleInputChange} required className="w-full border-gray-300 border-2 rounded py-2 px-4" />
          </div>
          <div className="mb-4">
            <label htmlFor="billNo" className="block font-semibold text-white mb-1">Bill No:</label>
            <input type="text" name="billNo" value={updatedBill.billNo} onChange={handleInputChange} required className="w-full border-gray-300 border-2 rounded py-2 px-4" />
          </div>
          <div className="mb-4">
            <label htmlFor="customerName" className="block text-white font-semibold mb-1">Customer Name:</label>
            <input type="text" name="customerName" value={updatedBill.customerName} onChange={handleInputChange} required className="w-full border-gray-300 border-2 rounded py-2 px-4" />
          </div>
          <div className="mb-4">
            <label htmlFor="waterCanCount" className="block text-white font-semibold mb-1">No. of Water Cans:</label>
            <input type="number" name="waterCanCount" value={updatedBill.waterCanCount} onChange={handleInputChange} required className="w-full border-gray-300 border-2 rounded py-2 px-4" />
          </div>
          <div className="mb-4">
            <label htmlFor="amountPerCan" className="block text-white font-semibold mb-1">Amount Per Can:</label>
            <input type="number" name="amountPerCan" value={updatedBill.amountPerCan} onChange={handleInputChange} required className="w-full border-gray-300 border-2 rounded py-2 px-4" />
          </div>
          <div className="mb-4">
            <label htmlFor="waterCanCount" className="block text-white font-semibold mb-1">No. of waterBoxCount:</label>
            <input type="number" name="waterBoxCount" value={updatedBill.waterBoxCount} onChange={handleInputChange} required className="w-full border-gray-300 border-2 rounded py-2 px-4" />
          </div>
          <div className="mb-4">
            <label htmlFor="amountPerCan" className="block text-white font-semibold mb-1">Amount Per Box:</label>
            <input type="number" name="amountPerBox" value={updatedBill.amountPerBox} onChange={handleInputChange} required className="w-full border-gray-300 border-2 rounded py-2 px-4" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2">Save</button>
            <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillModal;
