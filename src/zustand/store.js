import {create} from 'zustand';

const useStore = create((set) => ({
    userData: {},
    setUserData: (data) => set({ userData: data }),
}));

export default useStore;