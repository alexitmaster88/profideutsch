import { apiInstanceMy } from '@/services/base'

const BASE_URL = '/appeal'

const AppealApplicationService = {
  Get(docNumber: string | null) {
    if (docNumber == '' || docNumber === null || docNumber === undefined || docNumber === '0') {

      return apiInstanceMy.get(`${BASE_URL}/ChamberAppealApplication/Get`);
    } else {
      return apiInstanceMy.get(`${BASE_URL}/ChamberAppealApplication/Get/${docNumber}`);
    }
  },
  GetFromDocnumber(docNumber: string | null) {
    return apiInstanceMy.get(`${BASE_URL}/ChamberAppealApplication/GetFromDocnumber?docNumber=${docNumber}`);
  },
  Create(data: any) {
    return apiInstanceMy.post(`${BASE_URL}/ChamberAppealApplication/Create`, data);
  },
  GetByPassportData(Seria: string, Number: string, DateOfBirth: string) {
    return apiInstanceMy.get(`${BASE_URL}/ChamberAppealApplication/GetByPassportData?transaction_id=2&is_consent=Y&langId=1&document=${Seria + Number}&birth_date=${DateOfBirth}&is_photo=Y`);
  },
  UploadFile(formData: any) {
    return apiInstanceMy.post(`${BASE_URL}/ChamberAppealApplication/UploadFile`, formData, {
      headers: {
        'Content-Type': '*'
      }
    });
  },
  DownloadFile(fileId: string) {
    return apiInstanceMy.get(`${BASE_URL}/ChamberAppealApplication/DownloadFile/${fileId}`, { responseType: 'blob' });
  },
  DeleteFile(fileId: string) {
    return apiInstanceMy.post(`${BASE_URL}/ChamberAppealApplication/DeleteFile/${fileId}`);
  },

}



export default AppealApplicationService


