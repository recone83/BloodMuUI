import axios, { AxiosInstance } from 'axios';

import { Config, ConfigData } from "../lib/Config";
import { CharacterList, CharacterMiniModel, CharacterModel, FullList } from "../Model/CharacterModel";
import { ServerStatus } from "../Model/Type/Default";
import { LoginModel } from "../Model/LoginModel";

export type FormErrors = {
    [key:string]: CharacterMiniModel;
}

export type ServerStatusEvent = (status:number, message: ServerStatus|null) => void

export type Data = {
    [key:string]: any;
}
export type ResponseData = {status:number, data:Data}
export type ResponseDataEvent = (message: ResponseData) => void
export type TempDataEvent = (message: any) => void
export type CharacterListDataEvent = (message: {status:number, data: CharacterList}) => void
export type FullListDataEvent = (message: {status:number, data: FullList}) => void

export interface NewAccountPostData {
    LoginName: string; 
    EMail: string;
    Password: string; 
}
export type CharacterModelEvent = (message: {status:number, data: CharacterModel}) => void
/**
 * Communication Service
 */
export class CommunicationService {
    private static pointer: CommunicationService|null;
    private config: ConfigData;
    private api: AxiosInstance;

    private constructor() {
        this.config = Config.getConfig();
        this.api = axios.create({
            baseURL: this.config.uri,
            withCredentials: true
          });
    }

    static getInstance(): CommunicationService {
        if (CommunicationService.pointer == null) {
            CommunicationService.pointer = new CommunicationService();
        }

        return CommunicationService.pointer;
    }

    async createAccount(data: NewAccountPostData, run:ResponseDataEvent) {
        let postData = JSON.stringify(data);
        
        return await this.api.post('/v1/account/add', postData, { headers: {'Content-Type': 'application/json'}})
        .then(res => {
            run({status: res.status, data: res.data});
        }, (error) => {
            run({
                status: error.response.status, 
                data: error.response.data
            });
        });
    }
    async getServerStatus(run: ServerStatusEvent) {
        return await this.api.get('/v1/auth/status')
        .then(res => {
            run(res.status, res.data);
        }, (error) => {
            run(error.response.status, null);
        });
    }
    async getCharacterList(run: CharacterListDataEvent) {
        return await this.api.get('/v1/character/ranking/resets').then(res => {
            let lista = res.data as CharacterList;
            run({status:res.status, data:lista});
        }, (error) => {
            run({status:error.status, data: error});
        });
    }
    async getFullList(run: FullListDataEvent) {
        return await this.api.get('/v1/character/ranking/all').then(res => {
            let lista = res.data as FullList;
            run({status:res.status, data:lista});
        }, (error) => {
            run({status:error.status, data: error});
        });
    }
    async getCharacter(name:string, run: CharacterModelEvent) {
        return await this.api.get('/v1/character/get?nameCharacter='+name).then(res => {
            let character = res.data as CharacterModel;
            run({status:res.status, data: character});
        }, (error) => {
            run({status:error.status, data: error});
        });
    }
    async logIn(data: LoginModel, run:any) {
        let postData = JSON.stringify(data);
        
        return await this.api.post('/v1/auth/login',
             postData, {
                 headers: {'Content-Type': 'application/json'}
            })
        .then(res => {
            run(res.status);
        }, (error) => {
            run(error.response.status);
        });
    }

    async getChatLog(run: any) {
        return await this.api.get('v1/auth/chat/log').then(res => {
            run(res);
        }, (error) => {
            run({status:error.status, data: error});
        });
    }
}
