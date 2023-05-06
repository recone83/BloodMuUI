export interface CharacterModel {
    Name:string;
    Reset:string;
    Level:string;
}

export type CharacterList = {
    [key:string]: CharacterModel;
}

export interface CharacterList11<CharacterModel> {
    [Symbol.iterator](): Iterator<CharacterModel>;
}