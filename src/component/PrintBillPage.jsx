import React from 'react';

const PrintBillPage = ({ bill, onBack }) => {
  const handlePrint = () => {
    window.print();
  };
  const currentDate = new Date();
  const dueDate = new Date(currentDate);
  dueDate.setDate(currentDate.getDate() - 1)
  dueDate.setMonth(currentDate.getMonth() + 1);

  const formattedCurrentDate = currentDate.toLocaleDateString();
  const formattedDueDate = dueDate.toLocaleDateString();

  return (
    <div className="p-8 ">
      <div className='border border-black rounded'>
      <div className=' flex justify-between px-3 py-4 border-b-2 border-black '>
     <div className='px-4 '>
      <p className=' font-bold'>SIVAM AGENCY</p>
      <p>TRICHY ROAD-MANAPPARAI</p>
      <p>BUS DEPO-MANAPPARAI</p>
      <p>9865404049-9944348214</p>
     </div>
     <div className='px-4 border-l-2 border-black'>
      <p className=' font-bold'>ESTIMATE</p>
      <p>NO:{bill.billNo}</p>
      <p>DATE:{formattedCurrentDate}</p>
      <p>PAY MODE:CASH</p>
      <p>DUEDATE:{formattedDueDate}</p>
     </div>
     </div>
     <div className='px-4 py-2 h-96'>
      <p><span className='font-bold'>To:</span>{bill.customerName}</p>
      <p>Manapparai</p>
     

     <div className="my-8">
  <table className="w-full border border-black ">
    <thead className=' bg-black text-white'>
      <tr>
        <th className="py-2 px-2 w-12 border border-black">S. No</th>
        <th className="py-2 px-4 w-64 border border-black">Item Name</th>
        <th className="py-2 px-2 w-16 border border-black">Quantity</th>
        <th className="py-2 px-2 w-16 border border-black">Price</th>
        <th className="py-2 px-2 w-16 border border-black">Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="py-2 px-2 text-center border border-black">{bill.sno}</td>
        <td className="py-2 px-4 text-center border border-black"><pre></pre>{bill.itemName}</pre></td>
        <td className="py-2 px-2 text-center border border-black">{bill.waterCanCount}</td>
        <td className="py-2 px-2 text-center border border-black">{bill.amountPerCan}</td>
        <td className="py-2 px-2 text-center border border-black">{bill.waterCanCount * bill.amountPerCan}</td>
      </tr>
      {Number(bill.waterBoxCount) !== 0 && (
                <tr>
                  <td className="py-2 px-2 text-center border border-black">{Number(bill.sno) + 1}</td>
                  <td className="py-2 px-4 text-center border border-black">{bill.itemNames}</td>
                  <td className="py-2 px-2 text-center border border-black">{bill.waterBoxCount}</td>
                  <td className="py-2 px-2 text-center border border-black">{bill.amountPerBox}</td>
                  <td className="py-2 px-2 text-center border border-black">{bill.waterBoxCount * bill.amountPerBox}</td>
                </tr>
              )}
    </tbody>
  </table>
</div>

      <div className="flex justify-end px-8 mt-6 ">
        <p className="font-bold border-t-2 border-black">Total: ₹{bill.waterCanCount * bill.amountPerCan+bill.waterBoxCount*bill.amountPerBox}</p>
      </div>
      </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded hide-on-print" onClick={onBack}>Back</button>
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded hide-on-print" onClick={handlePrint}>Print Invoice</button>
      </div>
      
      <style>
        {`
          @media print {
            .hide-on-print {
              display: none !important;
            }
            th {
              background-color: black !important;
              color: white !important;
            }
            @page {
              size: auto; /* Set page size to fit content */
            }
          }
        `}
      </style>    </div>
  );
};

export default PrintBillPage;
