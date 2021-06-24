import React from 'react';

export default function Modal({ children, isOpen, setIsOpen }) {
  return (
    isOpen
      ? <>
        <div className="fixed z-100 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-grey opacity-50" onClick={() => setIsOpen(false)}/>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"/>&#8203;
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              <div className="bg-white">
                {children}
              </div>
            </div>
          </div>
        </div>
      </>
      : <> </>
  );
}