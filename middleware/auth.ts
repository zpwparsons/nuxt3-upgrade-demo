export default defineNuxtRouteMiddleware(async () => {
    const user = useUser();
    if (!user.value) return navigateTo({ name: 'auth-login' }, { replace: true });
});
