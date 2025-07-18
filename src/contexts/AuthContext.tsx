// D:/ds_mui_new/src/contexts/AuthContext.tsx

import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// --- 개선점 1: 명확한 타입 정의 ---
// 로그인에 필요한 자격 증명 타입을 정의합니다.
interface LoginCredentials {
    username: string;
    password?: string; // 비밀번호는 예시로 optional 처리
}

// 사용자 정보 타입을 정의합니다.
interface User {
    id: string;
    name: string;
}

// Context가 제공할 값들의 타입을 정의합니다.
interface AuthContextType {
    user: User | null;
    login: (credentials: LoginCredentials, rememberMe: boolean) => Promise<void>;
    signup: (id: string, password: string, name: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getUserFromStorage = (): User | null => {
    try {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        return null;
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // 앱 시작 시 사용자 정보를 확인하는 로직
    useEffect(() => {
        const storedUser = getUserFromStorage();
        if (storedUser) {
            setUser(storedUser);
        }
        setIsLoading(false);
    }, []);

    const login = useCallback(async (credentials: LoginCredentials, rememberMe: boolean) => {
        // --- 개선점 2: 로그인 실패에 대비한 에러 처리 ---
        try {
            // TODO: 실제 API 호출 로직으로 교체
            // const response = await api.auth.login(credentials);
            // const userData = response.data;

            // 현재는 더미 데이터를 사용합니다.
            const userData: User = { id: '1', name: credentials.username || '사용자' };

            setUser(userData);

            if (rememberMe) {
                localStorage.setItem('user', JSON.stringify(userData));
            } else {
                sessionStorage.setItem('user', JSON.stringify(userData));
            }
            navigate('/app');
        } catch (error) {
            console.error("Login failed:", error);
            // 사용자에게 로그인 실패를 알립니다.
            alert('아이디 또는 비밀번호가 일치하지 않습니다.');
            // 에러를 다시 던져서, 호출한 쪽(예: LoginPage)에서 추가적인 처리를 할 수 있게 합니다.
            throw error;
        }
    }, [navigate]);

    const signup = useCallback(async (id: string, password: string, name: string) => {
        // TODO: 실제 회원가입 API 호출 로직 구현
        console.log(`Signup attempt: ${id}, ${name}`);
        return Promise.resolve();
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        // --- 개선점 3: 로그아웃 후 이동 경로 명확화 ---
        navigate('/');
    }, [navigate]);

    // Context 값을 memoization하여 불필요한 리렌더링을 방지합니다.
    const value = useMemo(() => ({
        user,
        login,
        signup,
        logout,
        isLoading,
    }), [user, login, signup, logout, isLoading]);

    // 인증 상태 확인 중에는 앱의 나머지 부분을 렌더링하지 않습니다.
    if (isLoading) {
        return null; // 또는 전체 화면 로딩 스피너를 보여줄 수 있습니다.
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Context를 쉽게 사용하기 위한 커스텀 훅
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};