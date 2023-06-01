import { writable } from 'svelte/store';
 
export const UserStore = writable({
    isLoggedIn: false,
    user:{},
    authToken: null,
    refreshToken: null
});
 