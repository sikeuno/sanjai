import React, { useState, useEffect } from 'react';
import { db} from '../firebaseconfig';
import { addDoc, collection, deleteDoc, getDocs,doc } from 'firebase/firestore';
import BillModal from './BillModal';

import PrintBillPage from './PrintBillPage';

const Bill = () => {
  const [bills, setBills] = useState([]);
  const usersCollectionRef= collection(db,"user")
  const [editableIndex, setEditableIndex] = useState(null);
  const [selectedBill, setSelectedBill] = useState(null);
  const [fetchData, setFetchData] = useState(true);
  const [search,setSearch]= useState("")
  useEffect(() => {
    const debounceFetchData = setTimeout(() => {
      setFetchData(true);
    }, 1000); // Fetch data every 1 second

    return () => {
      clearTimeout(debounceFetchData);
    };
  }, [fetchData]);

  useEffect(() => {
    if (fetchData) {
      const getUser = async () => {
        const data = await getDocs(usersCollectionRef);
        setBills(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setFetchData(false);
      };

      getUser();
    }
  }, [fetchData, usersCollectionRef]);
const addBill = async (event) => {
  event.preventDefault();

  const {
    sno,
    billNo,
    customerName,
    waterCanCount,
    amountPerCan,
    itemName,
    amountPerBox,
    waterBoxCount,
    itemNames,
  } = event.target.elements;

  const newBill = {
    sno: sno.value,
    billNo: billNo.value,
    customerName: customerName.value,
    waterCanCount: waterCanCount.value,
    amountPerCan: amountPerCan.value,
    itemName: itemName.value,
    amountPerBox: amountPerBox.value,
    waterBoxCount: waterBoxCount.value,
    itemNames: itemNames.value,
    // Add other fields with their corresponding values
  };

  try {
    await addDoc(usersCollectionRef, newBill);
    console.log('Bill added successfully!');
  } catch (error) {
    console.error('Error adding bill:', error);
  }

  event.target.reset();
};
 

const deleteBill = async (index, billId) => {
  try {
    const userDoc=doc(db,"user",billId);
    await deleteDoc(userDoc)
    // Delete the bill from Firestore
    

    // Remove the bill from local state
    setBills((prevBills) => prevBills.filter((_, i) => i !== index));

    console.log('Bill deleted successfully!');
  } catch (error) {
    console.error('Error deleting bill:', error);
  }
};

  const editBill = (index) => {
    setEditableIndex(index);
  };

  const saveBillChanges = (updatedBill, index) => {
    setBills((prevBills) =>
      prevBills.map((bill, i) => (i === index ? updatedBill : bill))
    );
    setEditableIndex(null);
  };

  const printBill = (bill) => {
    setSelectedBill(bill);
  };

  const handleBack = () => {
    setSelectedBill(null);
  };
  

  
  if (selectedBill) {
    return <PrintBillPage bill={selectedBill} onBack={handleBack} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Bill Module</h2>

      <form onSubmit={addBill} className="mb-8">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label htmlFor="sno" className="block font-semibold">S. No:</label>
            <input type="text" id="sno" required className="w-full border-gray-300 border-2 rounded py-2 px-4" />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label htmlFor="billNo" className="block font-semibold">Bill No:</label>
            <input type="text" id="billNo" required className="w-full border-gray-300 border-2 rounded py-2 px-4" />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
            <label htmlFor="customerName" className="block font-semibold">Customer Name:</label>
            <input type="text" id="customerName" required className="w-full border-gray-300 border-2 rounded py-2 px-4" />
</div><div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
  <label htmlFor="itemName" className="block font-semibold">Item Name:</label>
  <textarea id="itemName" required className="w-full h-32 border-gray-300 border-2 rounded py-2 px-4 resize-none"></textarea>
</div>


<div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
<label htmlFor="waterCanCount" className="block font-semibold">No. of Water Cans:</label>
<input type="number" id="waterCanCount" required className="w-full border-gray-300 border-2 rounded py-2 px-4" />
</div>
<div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
<label htmlFor="amountPerCan" className="block font-semibold">Amount Per Can:</label>
<input type="number" id="amountPerCan" required className="w-full border-gray-300 border-2 rounded py-2 px-4" />
</div>
<div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
<label htmlFor="itemNames" className="block font-semibold">Item2Name:</label>
<input type="text" id="itemNames" required className="w-full border-gray-300 border-2 rounded py-2 px-4" />
</div>
<div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
<label htmlFor="waterCanCount" className="block font-semibold">No. of Water Box:</label>
<input type="number" id="waterBoxCount" required className="w-full border-gray-300 border-2 rounded py-2 px-4" />
</div>
<div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
<label htmlFor="amountPerCan" className="block font-semibold">Amount Per Box:</label>
<input type="number" id="amountPerBox" required className="w-full border-gray-300 border-2 rounded py-2 px-4" />
</div>
</div>
<button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Add Bill</button>
</form>
<div className="flex items-center mb-4">
        <label htmlFor="search" className="font-semibold mr-2">
          Search Customer Name:
        </label>
        <input
          type="text"
          id="search"
          onChange={(e)=>setSearch(e.target.value.toLocaleLowerCase())}
          className="border-gray-300 border-2 rounded py-2 px-4"
        />
      </div>

  <table className="w-full">
    <thead>
      <tr>
        <th className="py-2 px-4 border-b-2 border-gray-300">S. No</th>
        <th className="py-2 px-4 border-b-2 border-gray-300">Bill No</th>
        <th className="py-2 px-4 border-b-2 border-gray-300">Customer Name</th>
        <th className="py-2 px-4 border-b-2 border-gray-300">Item Name</th>
        <th className="py-2 px-4 border-b-2 border-gray-300">No. of Water Cans</th>
        <th className="py-2 px-4 border-b-2 border-gray-300">Amount Per Can</th>
        <th className="py-2 px-4 border-b-2 border-gray-300">Item2 Name</th>
        <th className="py-2 px-4 border-b-2 border-gray-300">No. of Water Box</th>
<th className="py-2 px-4 border-b-2 border-gray-300">Amount Per Box</th>
<th className="py-2 px-4 border-b-2 border-gray-300">Total</th>
<th className="py-2 px-4 border-b-2 border-gray-300">Actions</th>
<th className="py-2 px-4 border-b-2 border-gray-300">Actions</th>
<th className="py-2 px-4 border-b-2 border-gray-300">Actions</th>
</tr>
</thead>
<tbody>
{bills.sort((a, b) => a.sno - b.sno).filter((bill)=>{
  return search.toLocaleLowerCase() === ''? bill: bill.customerName.toLocaleLowerCase().includes(search)
}).map((bill, index) => (
<tr key={index}>
<td className="py-2 px-4 border-b border-gray-300">{bill.sno}</td>
<td className="py-2 px-4 border-b border-gray-300">{bill.billNo}</td>
<td className="py-2 px-4 border-b border-gray-300">{bill.customerName}</td>
<td className="py-2 px-4 border-b border-gray-300">{bill.itemName}</td>
<td className="py-2 px-4 border-b border-gray-300">{bill.waterCanCount}</td>
<td className="py-2 px-4 border-b border-gray-300">{bill.amountPerCan}</td>
<td className="py-2 px-4 border-b border-gray-300">{bill.itemNames}</td>
<td className="py-2 px-4 border-b border-gray-300">{bill.waterBoxCount}</td>
<td className="py-2 px-4 border-b border-gray-300">{bill.amountPerBox}</td>
<td className="py-2 px-4 border-b border-gray-300">{bill.waterCanCount * bill.amountPerCan+bill.waterBoxCount*bill.amountPerBox}</td>
<td className="py-2 px-4 border-b border-gray-300">
{editableIndex === index ? (
  <BillModal
  bill={bill}
  onSave={(updatedBill) => saveBillChanges(updatedBill, index)}
  onCancel={() => setEditableIndex(null)}
  db={db}
/>

) : (
<button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600" onClick={() => editBill(index)}>Edit</button>
)}
</td>
<td className="py-2 px-4 border-b border-gray-300">
<button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600" onClick={() => deleteBill(index,bill.id)}>Delete</button>
</td>
<td className="py-2 px-4 border-b border-gray-300">
<button className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600" onClick={() => printBill(bill)}>Print Bill</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
);
};

export default Bill;

