import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';

function GoBack() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="absolute top-0 left-0 px-4 py-9">
        <button onClick={goBack} className="flex items-center justify-center rounded-full p-2" style={{ backgroundColor: "#46b979" }}>
          <ChevronLeftIcon className="h-6 w-6 text-slate-50" />
        </button>
    </div>
  );
}

export default GoBack;
