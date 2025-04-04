import MainSettingService from '@/services/mainSetting';
import { defineStore } from 'pinia';

type MainSettingDto = {
    id: number
    phone: string
    shortPhone: string
    email: string
    workTime: string
    address: string
    playMarket: string
    appStore: string
    facebook: string
    instagram: string
    telegram: string
    createdAt: string
    updatedAt: string
    locale: string
    logo: {
        url: string
        name: string
    }
}

export const useMainSettingStore = defineStore({
    id: 'MainSetting',
    state: () => ({
        MainSetting: {} as MainSettingDto,
        MainSettingLoading: false as boolean,
        IsNavbarOpen: false as boolean,
        isSearchOpen: false as boolean,
        Meta: {} as any,
        FontSettings: {
            fontSize: '0',
            contracts: false,
            voices: false,
        }
    }),
    actions: {
        async fetchMainSetting() {
            this.MainSettingLoading = true;
            try {
                const res = await MainSettingService.Get();
                this.MainSetting = res.data?.data;
                return this.MainSetting;
            } finally {
                this.MainSettingLoading = false;
            }
        },
    },
    getters: {}
});
