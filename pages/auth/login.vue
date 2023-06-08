<script setup lang="ts">
const { login } = useAuth();

definePageMeta({
    layout: 'auth',
});

const form = reactive({
    email: '',
    password: '',
});

const handleLogin = () => {
    submitRequest(
        login(form),
        () => {
            navigateTo({ name: 'jobs' });
        },
        (validationErrors) => {
            console.log(validationErrors);
        },
    );
};
</script>

<template>
    <form @submit.prevent="handleLogin">
        <div>
            <label for="email">Email Address</label>
            <input v-model="form.email" type="email" id="email" name="email">
        </div>

        <div>
            <label for="password">Password</label>
            <input v-model="form.password" type="password" id="password" name="password">
        </div>

        <div>
            <button type="submit">Login</button>
        </div>

        <div>
            <NuxtLink :to="{ name: 'auth-register' }">Create an account</NuxtLink>
        </div>
    </form>
</template>
