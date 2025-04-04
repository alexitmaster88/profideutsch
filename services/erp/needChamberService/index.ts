import { apiInstanceErp } from '@/services/base'

const BASE_URL = '/hrm/NeedChamberService'

const NeedChamberServiceService = {
    GetList(data: any) {
        return apiInstanceErp.post(`${BASE_URL}/GetList`, data);
    },
    GetListGroupAndChild(data: any) {
        return apiInstanceErp.post(`${BASE_URL}/GetListGroupAndChild`, {}, {
            params: data
        });
    },
    Get(id: number) {
        return apiInstanceErp.get(`${BASE_URL}/Get/${id}`);
    },
}



export default NeedChamberServiceService


