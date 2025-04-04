import { apiInstance } from '@/services/base'

const BASE_URL = '/main-setting'

const MainSettingService = {
   Get() {
      return apiInstance.get(`${BASE_URL}`, {
         params: {
            populate: '*'
         }
      });
   },
}



export default MainSettingService


