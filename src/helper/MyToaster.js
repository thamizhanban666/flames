import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
 
function MyToaster() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Define default options
        className: '',
        duration: 5000,
        style: {
          background: '#363636',
          color: '#fff',
          borderRadius: '20px',
        },

        // Default options for specific types
        error: {
          duration: 4000,
          style: {
            background: '#444',
            // color: '#fff',
            border: '3px solid red',
          }
        },
      }}
    />
  )
}

export default MyToaster