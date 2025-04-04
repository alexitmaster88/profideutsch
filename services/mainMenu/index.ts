import { apiInstance } from '@/services/base'

const BASE_URL = '/main-menu'

const MainMenuService = {
   Get() {
      return apiInstance.get(`${BASE_URL}`, {
         params: {
            populate: {
               0: "MainMenuItems",
               1: "MainMenuItems.sections",
               2: "MainMenuItems.sections.children"
            }
         }
      });
   },
}



export default MainMenuService


