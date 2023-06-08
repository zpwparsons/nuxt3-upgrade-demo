import { FetchError } from 'ofetch';
import User from "~/interfaces/User";

// Value is initialized in: ~/plugins/auth.ts
export const useUser = () => {
    return useState<User | null>('user', (): null => null);
};

export const fetchCurrentUser = async () => {
    try {
        return await $larafetch<User>('/api/user', {
            redirectIfNotAuthenticated: false,
        });
    } catch (error) {
        if ([401, 419].includes((error as FetchError)?.response?.status as number)) return null;
        throw error;
    }
};
