import { apiInstance } from '@/services/base'

const BASE_URL = '/leaderships'

const LeadershipService = {
   GetList(params: any) {
      return apiInstance.get(`${BASE_URL}`, { params });
   },
   Get(id: number) {
      return apiInstance.get(`${BASE_URL}/${id}`);
   },
}



export default LeadershipService


