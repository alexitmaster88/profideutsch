import { apiInstanceMy } from '@/services/base'

const BASE_URL = '/NeedChamberServiceGroup'

const NeedChamberServiceGroupService = {
    GetList(data: any) {
        return apiInstanceMy.post(`${BASE_URL}/GetList`, data);
    },
    Get(id: number) {
        return apiInstanceMy.get(`${BASE_URL}/Get/${id}`);
    },
}



export default NeedChamberServiceGroupService


