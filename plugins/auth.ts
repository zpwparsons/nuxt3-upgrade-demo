import { useUser, fetchCurrentUser } from '~/composables/useUser';

export default defineNuxtPlugin(async () => {
    const user = useUser();

    // Skip if already initialized on server
    if (user.value !== undefined) return;

    user.value = await fetchCurrentUser();
});
