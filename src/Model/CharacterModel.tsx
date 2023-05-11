export interface CharacterMiniModel {
    name:string;
    class:string;
    resets:string;
}

export interface CharacterModel {
    name:string;
    class:string;
    currentMap:string;
    x:number;
    y:number;
    exp:number;
    lvl:number;
    reset:number;
}

export type CharacterList = {
    [key:string]: CharacterMiniModel;
}

export interface CharacterList11<CharacterMiniModel> {
    [Symbol.iterator](): Iterator<CharacterMiniModel>;
}