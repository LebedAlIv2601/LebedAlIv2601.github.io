import axios from "axios";

export default class KvsService {
    static BASE_URL = "https://partner-mobile.wildberries.ru/app/kvs/";

    static async getKvsFeatures() {
        const body = {
            id: 1,
            jsonrpc: "2.0",
            method: "abac.checkAccess",
            params: {
                scope: "features",
                featureKey: "allFeaturesUnload"
            }
        };
        return axios.post(this.BASE_URL, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}