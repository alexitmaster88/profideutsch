import { apiInstanceMy } from '@/services/base'

const BASE_URL = '/Manual'

const ManualService = {
  RegionSelectList() {
    return apiInstanceMy.get(`${BASE_URL}/RegionSelectList`);
  },
  DistrictSelectList(regionId: number) {
    return apiInstanceMy.get(`${BASE_URL}/DistrictSelectList?regionId=${regionId}`);
  },
  MfySelectList(districtId: number) {
    return apiInstanceMy.get(`${BASE_URL}/MfySelectList?districtId=${districtId}`);
  },
  AppealTypeSelectList() {
    return apiInstanceMy.get(`/appeal/ChamberAppealApplication/AppealTypeSelectList`);
  },
  AppealFormatTypeSelectList() {
    return apiInstanceMy.get(`/appeal/ChamberAppealApplication/AppealFormatTypeSelectList`);
  },
  AppealTypeArriveSelectList() {
    return apiInstanceMy.get(`/appeal/ChamberAppealApplication/AppealTypeArriveSelectList`);
  }
}



export default ManualService


