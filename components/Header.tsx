
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="flex items-center p-4 bg-white border-b border-gray-200 shadow-sm">
       <img
          src="https://picsum.photos/seed/jayesh/40/40"
          alt="Jayesh's Avatar"
          className="w-10 h-10 rounded-full mr-3"
        />
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Jayesh Bot</h2>
        <p className="text-xs text-green-500">Online</p>
      </div>
    </div>
  );
};

export default Header;
