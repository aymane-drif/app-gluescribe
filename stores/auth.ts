// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    session: null,
    loading: false,
    error: null as string | null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.user,
    isLoading: (state) => state.loading,
    getUser: (state) => state.user,
    getError: (state) => state.error
  },
  
  actions: {
    async fetchUser() {
      const supabase = useSupabase()
      this.loading = true
      
      try {
        const { data: { session } } = await supabase.auth.getSession()
        this.session = session as any
        
        if (session) {
          const { data: { user } } = await supabase.auth.getUser()
          this.user = user as any
        }
      } catch (error) {
        this.error = (error as Error).message
        console.error('Error fetching user:', (error as Error).message)
      } finally {
        this.loading = false
      }
    },
    
    async signIn(email: string, password: string) {
      const supabase = useSupabase()
      this.loading = true
      this.error = null
      
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        
        if (error) throw error
        
        this.user = data.user as any
        this.session = data.session as any
        return data
      } catch (error) {
        this.error = (error as Error).message
        console.error('Error signing in:', (error as Error).message)
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async signUp(email: string, password: string) {
      const supabase = useSupabase()
      this.loading = true
      this.error = null
      
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        })
        
        if (error) throw error
        
        // Note: User won't be set immediately if email confirmation is required
        return data
      } catch (error) {
        this.error = (error as Error).message
        console.error('Error signing up:', (error as Error).message)
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async signOut() {
      const supabase = useSupabase()
      this.loading = true
      
      try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        
        this.user = null
        this.session = null
      } catch (error) {
        this.error = (error as Error).message
        console.error('Error signing out:', (error as Error).message)
      } finally {
        this.loading = false
      }
    },
    
    setUser(user: any) {
      this.user = user
    },
    
    clearUser() {
      this.user = null
      this.session = null
    }
  }
})