// D:/ds_mui_new/src/App.tsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// [수정] App.tsx는 더 이상 CssBaseline을 import할 필요가 없습니다.
import { ThemeModeProvider } from './contexts/ThemeModeContext';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import MainLayout from './layouts/MainLayout';
import NotFoundPage from './pages/NotFoundPage';

function App() {
    return (
        <ThemeModeProvider>
            {/* CssBaseline이 ThemeModeProvider 내부로 이동했으므로 여기서 제거합니다. */}
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/app/*" element={<MainLayout />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </ThemeModeProvider>
    );
}

export default App;