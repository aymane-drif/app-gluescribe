// Composable for login functionality (composables/useLogin.js)
export const useLogin = () => {
  const authStore = useAuthStore()
  const router = useRouter()
  const route = useRoute()

  const loginState = reactive({
    email: '',
    password: '',
    error: null,
    loading: false
  })

  const handleLogin = async () => {
    try {
      loginState.error = null
      loginState.loading = true
      
      await authStore.signIn(loginState.email, loginState.password)
      
      // Redirect to the page user was trying to access or dashboard
      const redirectPath = route.query.redirect || '/dashboard'
      router.push(redirectPath)
    } catch (err) {
      loginState.error = err.message || 'Failed to login'
    } finally {
      loginState.loading = false
    }
  }

  return {
    ...toRefs(loginState),
    handleLogin
  }
}