<script setup lang="ts">
const { register } = useAuth();

definePageMeta({
    layout: 'auth',
});

const form = reactive({
    name: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const handleRegistration = () => {
    submitRequest(
        register(form),
        () => {
            navigateTo({ name: 'jobs' });
        },
        (validationErrors) => {
            console.log(validationErrors);
        },
    );
}
</script>

<template>
    <form @submit.prevent="handleRegistration">
        <div>
            <label for="name">Name</label>
            <input v-model="form.name" type="text" id="name" name="name">
        </div>

        <div>
            <label for="phone">Phone</label>
            <input v-model="form.phone" type="tel" id="phone" name="phone">
        </div>

        <div>
            <label for="email">Email Address</label>
            <input v-model="form.email" type="email" id="email" name="email">
        </div>

        <div>
            <label for="password">Password</label>
            <input v-model="form.password" type="password" id="password" name="password">
        </div>

        <div>
            <label for="password_confirmation">Confirm Password</label>
            <input v-model="form.password_confirmation" type="password" id="password_confirmation" name="password_confirmation">
        </div>

        <div>
            <button type="submit">Login</button>
        </div>

        <div>
            <NuxtLink :to="{ name: 'auth-login' }">Already registered?</NuxtLink>
        </div>
    </form>
</template>
