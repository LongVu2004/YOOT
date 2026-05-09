import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import "tailwindcss/tailwind.css";

const AdminLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
      
      {/* --- SIDEBAR BÊN TRÁI --- */}
      <aside style={{ width: '250px', backgroundColor: '#0f172a', color: 'white', display: 'flex', flexDirection: 'column' }}>
        {/* Logo */}
        <div style={{ padding: '20px', borderBottom: '1px solid #1e293b', textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>YOEDU</h2>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>Quản lý đào tạo</span>
        </div>

        {/* Menu Navigation */}
        <nav style={{ flex: 1, padding: '10px 0', overflowY: 'auto' }}>
          <div style={{ padding: '10px 20px', fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' }}>
            Quản trị
          </div>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <NavLink 
                to="/students" 
                style={({ isActive }) => ({
                  display: 'flex', alignItems: 'center', padding: '12px 20px', textDecoration: 'none',
                  color: isActive ? '#38bdf8' : '#cbd5e1',
                  backgroundColor: isActive ? '#1e293b' : 'transparent',
                  borderLeft: isActive ? '4px solid #38bdf8' : '4px solid transparent'
                })}
              >
                Học viên
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/courses" 
                style={({ isActive }) => ({
                  display: 'flex', alignItems: 'center', padding: '12px 20px', textDecoration: 'none',
                  color: isActive ? '#38bdf8' : '#cbd5e1',
                  backgroundColor: isActive ? '#1e293b' : 'transparent',
                  borderLeft: isActive ? '4px solid #38bdf8' : '4px solid transparent'
                })}
              >
                Khóa đào tạo
              </NavLink>
            </li>

            {/* <li>
              <NavLink 
                to="/teachers" 
                style={({ isActive }) => ({
                  display: 'flex', alignItems: 'center', padding: '12px 20px', textDecoration: 'none',
                  color: isActive ? '#38bdf8' : '#cbd5e1',
                  backgroundColor: isActive ? '#1e293b' : 'transparent',
                  borderLeft: isActive ? '4px solid #38bdf8' : '4px solid transparent'
                })}
              >
                Giảng viên
              </NavLink>
            </li> */}
          </ul>
        </nav>
      </aside>

      {/* --- KHU VỰC NỘI DUNG CHÍNH (BÊN PHẢI) --- */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc', overflow: 'hidden' }}>
        
        {/* Header ở trên cùng */}
        <header style={{ height: '60px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
          <div style={{ cursor: 'pointer', fontSize: '20px' }}>☰</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span>🔔</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e293b' }}>Admin User</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Quản trị viên</div>
              </div>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#cbd5e1' }}></div>
            </div>
          </div>
        </header>

        {/* Nơi hiển thị các component con (CourseManagement, StudentManagement...) */}
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          <Outlet /> 
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;