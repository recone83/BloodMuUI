import jsonConfig from '../config.json';

export interface ConfigData {
    uri:string;
}; 
 
/**
 * Configuration Service
 */
export class Config {
    private static bufforData: ConfigData;

    public static getConfig(): ConfigData {
        if(this.bufforData == null) {
            this.bufforData = JSON.parse(JSON.stringify(jsonConfig));
        }

        return this.bufforData;
    }
}