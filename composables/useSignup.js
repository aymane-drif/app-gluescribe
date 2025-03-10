// Composable for signup functionality (composables/useSignup.js)
export const useSignup = () => {
    const authStore = useAuthStore()
    const router = useRouter()
  
    const signupState = reactive({
      email: '',
      password: '',
      confirmPassword: '',
      error: null,
      successMessage: null,
      loading: false
    })
  
    const passwordsMatch = computed(() => {
      return signupState.password === signupState.confirmPassword
    })
  
    const validateForm = () => {
      signupState.error = null
  
      if (!signupState.email || !signupState.password) {
        signupState.error = 'Email and password are required'
        return false
      }
  
      if (signupState.password.length < 6) {
        signupState.error = 'Password must be at least 6 characters'
        return false
      }
  
      if (!passwordsMatch.value) {
        signupState.error = 'Passwords do not match'
        return false
      }
  
      return true
    }
  
    const handleSignup = async () => {
      if (!validateForm()) return
      
      try {
        signupState.loading = true
        
        const { user, session } = await authStore.signUp(signupState.email, signupState.password)
        
        if (user) {
          if (user.identities?.length === 0) {
            // User already exists
            signupState.error = 'User with this email already exists'
          } else if (user.confirmation_sent_at && !session) {
            // Email confirmation required
            signupState.successMessage = 'Registration successful. Please check your email for confirmation instructions.'
          } else if (session) {
            // Auto-login was successful
            router.push('/dashboard')
          }
        }
      } catch (err) {
        signupState.error = err.message || 'Failed to register'
      } finally {
        signupState.loading = false
      }
    }
  
    return {
      ...toRefs(signupState),
      passwordsMatch,
      handleSignup
    }
  }