// plugins/supabase-auth.js
export default defineNuxtPlugin(async (nuxtApp) => {
    const authStore = useAuthStore()
    const supabase = useSupabase()
    // Set up auth state change listener
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
            // Update the auth store with the new user
            supabase.auth.getUser().then(({ data: { user } }) => {
                authStore.setUser(user)
            })
        } else if (event === 'SIGNED_OUT') {
            // Clear the user from the auth store
            authStore.clearUser()
        }
    })

    // Fetch the initial user on app load
    await authStore.fetchUser()
})