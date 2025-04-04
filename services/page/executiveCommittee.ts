import { apiInstance } from '@/services/base'

const BASE_URL = '/ijroiya-qomitas'

const ExecutiveCommitteeService = {
    GetList(params: any) {
        return apiInstance.get(`${BASE_URL}`, {
            params: {
                ...{
                    sort: "createdAt:DESC",
                },
                ...params
            }
        });
    },
    Get(id: string) {
        return apiInstance.get(`${BASE_URL}/${id}`);
    },
}



export default ExecutiveCommitteeService


