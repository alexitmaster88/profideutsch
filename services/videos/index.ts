import { apiInstance } from '@/services/base'

const BASE_URL = '/videos'

const VideosService = {
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
   Get(id: number) {
      return apiInstance.get(`${BASE_URL}/${id}`);
   },
}



export default VideosService


