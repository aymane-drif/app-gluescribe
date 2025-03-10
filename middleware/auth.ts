// middleware/auth.js
export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore()
    // Get the current path for redirection after login
    const redirectPath = to.fullPath
    
    if (!authStore.isAuthenticated) {
      // Try to fetch user if not already loaded
      await authStore.fetchUser()
      
      // If still not authenticated, redirect to login
      if (!authStore.isAuthenticated) {
        return navigateTo({
          path: '/sign-in',
          query: {
            redirect: redirectPath
          }
        })
      }
    }
  })