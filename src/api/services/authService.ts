// 이 파일은 실제 백엔드 API를 흉내 냅니다.

// 1. 가상 사용자 데이터베이스
const fakeUsers = [
    {
        id: 'user',
        password: 'password123',
        name: '김지영',
        role: 'user',
    },
    {
        id: 'admin',
        password: 'adminpassword',
        name: '박관리',
        role: 'admin',
    },
];

export interface User {
    id: string;
    name: string;
    role: string;
}

// 2. 로그인 함수
export const authService = {
    login: (id: string, password: string): Promise<User> => {
        // 실제 API 호출처럼 보이게 하기 위해 Promise를 사용합니다.
        return new Promise((resolve, reject) => {
            // 0.5초 지연을 줘서 네트워크 통신처럼 보이게 합니다.
            setTimeout(() => {
                const foundUser = fakeUsers.find(user => user.id === id && user.password === password);

                if (foundUser) {
                    // 성공 시, 비밀번호를 제외한 사용자 정보를 반환합니다.
                    const { password, ...userToReturn } = foundUser;
                    resolve(userToReturn);
                } else {
                    // 실패 시, 에러를 발생시킵니다.
                    reject(new Error('아이디 또는 비밀번호가 올바르지 않습니다.'));
                }
            }, 500);
        });
    },
    signup: (id: string, password: string, name: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const exists = fakeUsers.some(user => user.id === id);
                if (exists) {
                    reject(new Error('이미 존재하는 아이디입니다.'));
                } else {
                    fakeUsers.push({ id, password, name, role: 'user' });
                    resolve();
                }
            }, 500);
        });
    },
};