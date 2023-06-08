<script setup lang="ts">
const { logout } = useAuth();

definePageMeta({
    middleware: 'auth',
});
</script>

<template>
    <button @click="logout()">Log Out</button>

    Jobs
</template>
