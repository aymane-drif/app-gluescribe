// Composable for signout functionality (composables/useSignout.js)
export const useSignout = () => {
    const authStore = useAuthStore()
    const router = useRouter()

    const signoutState = reactive({
        loading: false,
        error: null
    })

    const handleSignout = async (redirectPath = '/login') => {
        try {
            signoutState.loading = true
            signoutState.error = null

            await authStore.signOut()

            // Redirect after successful signout
            router.push(redirectPath)
        } catch (err) {
            signoutState.error = err.message || 'Failed to sign out'
            console.error('Error signing out:', err)
        } finally {
            signoutState.loading = false
        }
    }

    return {
        ...toRefs(signoutState),
        handleSignout
    }
}