// plugins/supabase.js
import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin((nuxtApp) => {
  const config = nuxtApp.$config;
  const supabaseUrl = config.public.supabaseUrl
  const supabaseKey = config.public.supabaseKey
  
  const supabase = createClient(supabaseUrl, supabaseKey)
  
  return {
    provide: {
      supabase
    }
  }
})