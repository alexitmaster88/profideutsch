import { apiInstance } from '@/services/base'
import { type AxiosRequestConfig } from 'axios';

const BASE_URL = '/export-prices'

const ExportPriceService = {
    GetList(params: any) {
        return apiInstance.get(`${BASE_URL}`, {
            params: {
                ...{
                    sort: "date:DESC",
                },
                ...params
            }
        });
    },
    Get(type: string, config?: AxiosRequestConfig<any>) {
        return apiInstance.get(`${BASE_URL}/${type}`, config);
    },
    FindOneByType(type: string, config?: AxiosRequestConfig<any>) {
        return apiInstance.get(`${BASE_URL}/type/${type}`, config);
    },

}

export default ExportPriceService


