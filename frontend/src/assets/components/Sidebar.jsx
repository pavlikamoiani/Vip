import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../images/logo.png';
import styles from '../css/Logout.module.css';
import sidebarStyles from '../css/Sidebar.module.css';
import '../../App.css';
import defaultInstance from '../../api/defaultInstance';

const Sidebar = () => {
  const navigate = useNavigate();
  const [vipOpen, setVipOpen] = useState(false);
  const [workerOpen, setWorkerOpen] = useState(false);

  const handleLogout = async () => {
    try {
      console.log('Attempting logout with token:', localStorage.getItem('authToken'));
      const response = await defaultInstance.post('/logout', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      console.log('Logout successful:', response.data);

      // Удаляем токен и флаг после успешного ответа сервера
      localStorage.removeItem('authToken');
      localStorage.removeItem('isLoggedIn');

      // Перенаправляем на страницу логина
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error.response?.data || error.message);
      // Удаляем токен даже при ошибке, чтобы избежать "залипания"
      localStorage.removeItem('authToken');
      localStorage.removeItem('isLoggedIn');
      navigate('/login', { replace: true });
    }
  };

  const isSuperAdmin = localStorage.getItem('role') === 'super_admin';
  const isAdmin = localStorage.getItem('role') === 'admin';

  return (
    <div className="nav-left-sidebar sidebar-dark">
      <div className="menu-list">
        <div className="logo-gorgia">
          <button
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              margin: 0,
              cursor: 'pointer',
              display: 'block'
            }}
            onClick={() => window.location.reload()}
            aria-label="Reload page"
          >
            <img src={logo} className="logo bottom-fade-in" alt="Logo" />
          </button>
        </div>
        <hr />
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav flex-column">
              <li className="nav-item">
                {!isSuperAdmin && (
                  <NavLink
                  to="/company-dashboard"
                  className={({ isActive }) => `fade-in nav-link ${isActive ? 'my-active' : ''}`}
                >
                  <i className="fa fa-fw fa-user-circle"></i>Company Dashboard
                </NavLink>
                )}          
              </li>
              {isAdmin && (
              <li className="nav-item" style={{ marginTop: '20px' }}>
                <NavLink
                  to="/caller-dashboard"
                  className={({ isActive }) => `fade-in nav-link ${isActive ? 'my-active' : ''}`}
                >
                  <i className="fa fa-fw fa-user-circle"></i>Caller Dashboard
                </NavLink>
              </li>
              )}
              {isSuperAdmin && (
                <li className="nav-item" style={{ marginTop: '20px' }}>
                  <div
                    className={`${sidebarStyles.dropdownToggle} fade-in nav-link`}
                    onClick={() => setVipOpen((open) => !open)}
                    tabIndex={0}
                    role="button"
                  >
                    <div className={sidebarStyles.vip} >
                      <i className="fa fa-fw fa-star"></i>VIP დეპარტამენტი
                    </div>
                    <span className={sidebarStyles.arrow + (vipOpen ? ` ${sidebarStyles.open}` : '')}></span>
                  </div>
                  <div
                    className={`${sidebarStyles.dropdownPanel} ${vipOpen ? sidebarStyles.open : ''}`}
                  >
                    <ul className={sidebarStyles.dropdownList}>
                      <li className={sidebarStyles.dropdownItem}
                          onClick={() => {
                            localStorage.setItem('department_id', '1');
                            window.location.href = '/company-dashboard';
                          }}>
                        <i className="fa fa-fw fa-building"></i>Company Dashboard
                      </li>
                      <li className={sidebarStyles.dropdownItem}
                          onClick={() => {
                            localStorage.setItem('department_id', '1');
                            window.location.href = '/caller-dashboard';
                          }}>
                        <i className="fa fa-fw fa-phone"></i>Caller Dashboard
                      </li>
                    </ul>
                  </div>
                </li>
              )}
              {isSuperAdmin && (
                <li className="nav-item" style={{ marginTop: '20px' }}>
                  <div
                    className={`${sidebarStyles.dropdownToggle} fade-in nav-link`}
                    onClick={() => setWorkerOpen((open) => !open)}
                    tabIndex={0}
                    role="button"
                  >
                  <div className={sidebarStyles.worker}> <i className="fa fa-fw fa-user-circle"></i>ხელოსნების დეპარტამენტი</div>
                   
                    <span className={sidebarStyles.arrow + (workerOpen ? ` ${sidebarStyles.open}` : '')}></span>
                  </div>
                  <div
                    className={`${sidebarStyles.dropdownPanel} ${workerOpen ? sidebarStyles.open : ''}`}
                  >
                    <ul className={sidebarStyles.dropdownList}>
                      <li className={sidebarStyles.dropdownItem}
                          onClick={() => {
                            localStorage.setItem('department_id', '2');
                            window.location.href = '/company-dashboard';
                          }}>
                        <i className="fa fa-fw fa-building"></i>Company Dashboard
                      </li>
                      {/* <li className={sidebarStyles.dropdownItem}
                          onClick={() => {
                            localStorage.setItem('department_id', '2');
                            window.location.href = '/caller-dashboard';
                          }}>
                        <i className="fa fa-fw fa-phone"></i>Caller Dashboard
                      </li> */}
                    </ul>
                  </div>
                </li>
              )}
              {isAdmin || isSuperAdmin && (
                <li className="nav-item" style={{ marginTop: '20px' }}>
                  <NavLink
                    to="/admin-dahsboard"
                    className={({ isActive }) => `fade-in nav-link ${isActive ? 'my-active' : ''}`}
                  >
                    <i className="fa fa-fw fa-user-circle"></i>Admin Dashboard
                  </NavLink>
                </li>
              )}
              <li className="nav-item fade-in" style={{ marginTop: '20px' }}>
                <button className={styles.Btn} onClick={handleLogout}>
                  <div className={styles.sign}>
                    <svg viewBox="0 0 512 512">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                    </svg>
                  </div>
                  <div className={styles.text}>Logout</div>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;