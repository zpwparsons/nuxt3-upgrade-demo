type User = {
    name: string;
    email?: string;
    permission: string;
    email_verified_at: string;
};

// Value is initialized in: ~/plugins/auth.ts
export const useUser = () => {
    return useState<User>('user', () => undefined);
};

export const fetchCurrentUser = async () => {
    try {
        return await $larafetch<User>('/api/user', {
            redirectIfNotAuthenticated: false,
        });
    } catch (error) {
        if ([401, 419].includes(error?.response?.status)) return null;
        throw error;
    }
};
