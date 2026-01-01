import React from 'react';
import { useAuth } from '../context/AuthContext';
import { MdPerson } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

const Topbar = () => {
  const { logout } = useAuth();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="admin-topbar">
      <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div className="lang-toggle">
            <button onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'active-lang' : ''}>EN</button>
            <span>/</span>
            <button onClick={() => changeLanguage('tr')} className={i18n.language === 'tr' ? 'active-lang' : ''}>TR</button>
        </div>
        <div className="admin-profile">
          <MdPerson />
          <span>Admin</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
