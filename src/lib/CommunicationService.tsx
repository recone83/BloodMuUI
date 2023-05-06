import axios from 'axios';

import { Config, ConfigData } from "../lib/Config";
import { RegisterState } from "../Actions/Register";
import { CharacterList, CharacterModel } from "../Model/CharacterModel";

export type FormErrors = {
    [key:string]: CharacterModel;
}

export type Data = {
    [key:string]: any;
}
export type ResponseData = {status:number, data:Data}
export type ResponseDataEvent = (message: ResponseData) => void
export type TempDataEvent = (message: any) => void
export type CharacterListDataEvent = (message: {status:number, data:CharacterList}) => void

export interface NewAccountPostData {
    LoginName: string; 
    EMail: string;
    Password: string; 
}

/**
 * Communication Service
 */
export class CommunicationService {
    private static pointer: CommunicationService|null;
    private config: ConfigData;

    private constructor() {
        this.config = Config.getConfig();
    }

    static getInstance(): CommunicationService {
        if (CommunicationService.pointer == null) {
            CommunicationService.pointer = new CommunicationService();
        }

        return CommunicationService.pointer ;
    }
    
    async getCurrencyArray(run: TempDataEvent) {
        return await axios.get(this.config.uri).then(res => {
            console.log("API call getHistory");

            if (run !== undefined)
                run(res.data);

            return res.data;
        }, (error) => {
            console.log(error);
        })
    }

    async createAccount(data: NewAccountPostData, run:ResponseDataEvent) {
        let postData = JSON.stringify(data);
        
        return await axios.post(this.config.uri+'/account/add', postData).then(res => {
            run({status: res.status, data: res.data});
        }, (error) => {
            run({
                status: error.response.status, 
                data: error.response.data
            });
        });
    }

    async getCharacterList(run:CharacterListDataEvent) {
        return await axios.get(this.config.uri+'/character/get').then(res => {
            let lista = res.data as CharacterList;
            run({status:res.status, data:lista});
        }, (error) => {
            run({status:error.status, data: error});
        });
    }
}
