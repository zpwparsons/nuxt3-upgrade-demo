<script setup lang="ts">
const user = useUser();

definePageMeta({
   middleware: 'auth',
});
</script>

<template>
   Profile
   <pre>{{ user }}</pre>
</template>
