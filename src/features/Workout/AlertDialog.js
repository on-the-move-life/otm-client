import React from 'react';

const AlertDialog = ({
  handleAlertDialog,
  message = 'Are you sure you want to submit?',
  submitButtonColor,
}) => {
  return (
    <div className="fixed inset-0 z-50 mx-auto flex  w-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className=" max-w-[320px] rounded-lg border border-[#383838] bg-black  p-6 shadow-lg">
        <p className="mb-6 ">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            className="rounded border-[0.5px] border-[#383838] px-4 py-2"
            onClick={() => handleAlertDialog(false)}
          >
            Cancel
          </button>
          <button
            className={`rounded ${
              submitButtonColor ? submitButtonColor : 'bg-green'
            } px-4 py-2 text-black`}
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
