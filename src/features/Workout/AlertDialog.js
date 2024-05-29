import React from 'react';

const AlertDialog = ({ handleAlertDialog }) => {
  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="rounded-lg border border-white bg-black  p-6 shadow-lg">
        <p className="mb-6 ">Are you sure you want to finish?</p>
        <div className="flex justify-end space-x-4">
          <button
            className="rounded px-4 py-2 hover:bg-gray-400"
            onClick={()=> handleAlertDialog(false)}
          >
            Cancel
          </button>
          <button
            className="hover:bg-green-600 rounded bg-green px-4 py-2 text-black"
            onClick={() => handleAlertDialog(true)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
export default AlertDialog;
