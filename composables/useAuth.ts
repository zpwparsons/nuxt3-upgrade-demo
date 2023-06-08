export const useAuth = () => {
    const router = useRouter();

    const user = useUser();
    const isLoggedIn = computed(() => !!user.value);

    async function refresh() {
        try {
            user.value = await fetchCurrentUser();
        } catch {
            user.value = null;
        }
    }

    async function login(credentials) {
        if (isLoggedIn.value) return;

        await $larafetch('/login', { method: 'post', body: credentials });
        await refresh();
    }

    async function register(credentials) {
        await $larafetch('/register', { method: 'post', body: credentials });
        await refresh();
    }

    async function resendEmailVerification() {
        return $larafetch<{ status: string }>('/email/verification-notification', {
            method: 'post',
        });
    }

    async function logout() {
        if (!isLoggedIn.value) return;

        await $larafetch('/logout', { method: 'post' });

        router.push('/');
        user.value = null;
    }

    async function forgotPassword(email) {
        return await $larafetch<{ status: string }>('/forgot-password', {
            method: 'post',
            body: { email },
        });
    }

    async function resetPassword(credentials) {
        return await $larafetch<{ status: string }>('/reset-password', {
            method: 'post',
            body: credentials,
        });
    }

    return {
        user,
        isLoggedIn,
        login,
        register,
        resendEmailVerification,
        logout,
        forgotPassword,
        resetPassword,
        refresh,
    };
};
