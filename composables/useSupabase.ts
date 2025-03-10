export default function useSupabase(){
    const { $supabase } = useNuxtApp();
    return $supabase;
}