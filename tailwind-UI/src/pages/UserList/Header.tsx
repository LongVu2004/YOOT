import React from 'react';

const Header = () => {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Users</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        {/* Search Bar */}
        <div className="relative w-full md:w-[320px]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 1.65a7.5 7.5 0 010 15z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search users"
            className="w-full pl-10 pr-4 py-2 bg-transparent border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-gray-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 text-[13px] font-medium text-gray-600">
          <button className="hover:text-gray-900">Reputation</button>
          <button className="bg-[#2600ff] text-white px-3 py-1.5 rounded-lg">New users</button>
          <button className="hover:text-gray-900">Voters</button>
          <button className="hover:text-gray-900">Editors</button>
          <button className="hover:text-gray-900">Moderators</button>
        </div>
      </div>
    </div>
  );
};

export default Header;