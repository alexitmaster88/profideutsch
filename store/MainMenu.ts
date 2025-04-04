import MainMenuService from '@/services/mainMenu';
import { defineStore } from 'pinia';

type MeinMenuDto = {
    id: number
    title: string
    __component: string,
    sections?: {
        id: 1,
        title: string,
        url: string,
        children: {
            id: number,
            title: string,
            url: string
            description: string
        }[]
    }[]
    url?: string
    description?: string
}

export const useMainMenuStore = defineStore({
    id: 'MainMenu',
    state: () => ({
        MainMenu: [] as MeinMenuDto[],
        MainMenuLoading: false as boolean,
    }),
    actions: {
        async fetchMainMenu() {
            this.MainMenuLoading = true;
            try {
                const res = await MainMenuService.Get();
                this.MainMenu = res.data?.data?.MainMenuItems || [];
                return this.MainMenu;
            } finally {
                this.MainMenuLoading = false;
            }
        },
    },
    getters: {}
});
