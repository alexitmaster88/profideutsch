import { apiInstanceErp } from '@/services/base'
import type { CompanyHighNewInfoDto, CompanyInfoDto, CompanyStateNewInfoDto, CriteriesDto } from './models';

const BASE_URL = '/Soliq'

const SoliqService = {
   GetCompanyCriteries(tin: string) {
      return apiInstanceErp.get<{ companyInfo: CompanyInfoDto, criteries: CriteriesDto[] }>(`${BASE_URL}/GetCompanyCriteries/${tin}`);
   },
   GetCompanyHighNewInfo() {
      return apiInstanceErp.get<CompanyHighNewInfoDto[]>(`${BASE_URL}/GetCompanyHighNewInfo`);
   },
   GetCompanyStateNewInfo(params: any) {
      return apiInstanceErp.get<CompanyStateNewInfoDto[]>(`${BASE_URL}/GetCompanyStateNewInfo`, { params });
   },
}



export default SoliqService


