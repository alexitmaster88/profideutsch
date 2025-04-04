import { apiInstance } from '@/services/base'

const BASE_URL = '/reklamas'

const ReklamaService = {
   GetList(params: any) {
      return apiInstance.get(`${BASE_URL}`, {
         params: {
            ...{
               sort: "priority:DESC",
            },
            ...params
         }
      });
   },
   Get(id: string) {
      return apiInstance.get(`${BASE_URL}/${id}`);
   },
}



export default ReklamaService


