<script setup lang="ts">
definePageMeta({
    layout: 'blank',
});

const logIn = () => {
    console.log('submitting...')
};
</script>

<template>
    <form @submit.prevent="logIn">
        <div>
            <label for="email">Email Address</label>
            <input type="email" id="email" name="email">
        </div>

        <div>
            <label for="password">Password</label>
            <input type="password" id="password" name="password">
        </div>

        <div>
            <button type="submit">Login</button>
        </div>
    </form>
</template>
