import { create } from 'zustand';

// Example Zustand store

const useStore = create((set) => ({
    userData: null,
    setUserData: (newUser) => set({ userData: newUser }), // Ensure this updates the state
}));


export default useStore;