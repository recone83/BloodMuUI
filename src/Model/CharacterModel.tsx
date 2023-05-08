export interface CharacterModel {
    name:string;
    class:string;
    resets:string;
}

export type CharacterList = {
    [key:string]: CharacterModel;
}

export interface CharacterList11<CharacterModel> {
    [Symbol.iterator](): Iterator<CharacterModel>;
}