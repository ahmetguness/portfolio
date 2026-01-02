import React, { useState, useEffect } from 'react';
import { MdSave } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import config from '../../config';

const ResumeSettings = () => {
    const { t } = useTranslation();
    const [urls, setUrls] = useState({ resume_en: '', resume_tr: '' });
    const [msg, setMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch(`${config.API_BASE_URL}/settings`);
            const data = await res.json();
            setUrls({
                resume_en: data.resume_en || '',
                resume_tr: data.resume_tr || ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrls({ ...urls, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${config.API_BASE_URL}/settings`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(urls)
            });
            if (res.ok) {
                setMsg(t('Admin.ResumeSaveSuccess'));
            } else {
                setMsg(t('Admin.ResumeSaveError'));
            }
        } catch (error) {
            setMsg(t('Admin.ResumeSaveError'));
        }
        setIsLoading(false);
    };

    return (
        <div className="admin-page">
            <div className="page-header">
                <h1>{t('Admin.ResumeSettings')}</h1>
            </div>

            <div className="admin-card">
                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-group">
                        <label>{t('Admin.ResumeEnUrl')}</label>
                        <input
                            type="text"
                            name="resume_en"
                            value={urls.resume_en}
                            onChange={handleChange}
                            placeholder="https://..."
                        />
                    </div>
                    <div className="form-group">
                        <label>{t('Admin.ResumeTrUrl')}</label>
                        <input
                            type="text"
                            name="resume_tr"
                            value={urls.resume_tr}
                            onChange={handleChange}
                            placeholder="https://..."
                        />
                    </div>

                    {msg && <p className="msg">{msg}</p>}

                    <div className="form-actions">
                        <button type="submit" className="admin-btn" disabled={isLoading}>
                            <MdSave /> {isLoading ? t('Admin.ResumeSaveLoading') : t('Admin.ResumeSaveChanges')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResumeSettings;
