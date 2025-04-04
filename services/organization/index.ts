import { apiInstance } from '@/services/base'

const BASE_URL = '/organizations'

const OrganizationService = {
    GetList(params: any) {
        return apiInstance.get(`${BASE_URL}`, { params });
    }
}



export default OrganizationService


