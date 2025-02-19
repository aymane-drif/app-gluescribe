<!-- File: pages/auth/callback.vue -->
<template>
    <div>
        <h1>Authentication Callback</h1>
        <p>Processing authentication response...</p>
    </div>
</template>

<script>
export default {
    mounted() {
        const query = this.$route.query;
        // Process the Supabase auth response here (e.g., token handling)
        console.log('Auth query params:', query);
    }
}
</script>