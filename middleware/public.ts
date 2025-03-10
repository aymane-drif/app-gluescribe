// middleware/public.js
export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore()
    
    // Try to fetch user if not already loaded
    if (!authStore.isAuthenticated && !authStore.isLoading) {
      await authStore.fetchUser()
    }
    
    // If user is authenticated, redirect to dashboard
    if (authStore.isAuthenticated) {
      // Get redirect query param or default to dashboard
      const redirectPath = typeof to.query.redirect === 'string' ? to.query.redirect : '/'
      return navigateTo(redirectPath)
    }
  })