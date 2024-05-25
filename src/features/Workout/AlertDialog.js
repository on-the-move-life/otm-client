import React from 'react'

const AlertDialog = ({ show, onClose, onConfirm }) => {


    if (!show) {
        return null;
    }



    return (
        <div className="fixed inset-0 z-50  flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="bg-black p-6 rounded-lg shadow-lg  border-green border-2">
                <h2 className="text-xl font-semibold mb-4">Important Notice</h2>
                <p className="mb-6 ">Are you sure you want to finish?</p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};
export default AlertDialog