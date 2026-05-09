import React from 'react';
import Header from '../UserList/Header';
import Grid from '../UserList/Grid';

const UserPage = () => {
  return (
    <div className="min-h-screen bg-[#dce0e5] p-6 md:p-12 flex justify-center font-sans">
      

      <div className="w-full max-w-[1700px] bg-[#f8f9fa] rounded-3xl p-10 md:p-14 shadow-sm"> {/* max-w lớn hơn và bỏ border */}
        <Header />
        <Grid />
      </div>

    </div>
  );
};

export default UserPage;