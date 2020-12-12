export interface DecodedObject {
    id: number
}

export type EncodingObject = DecodedObject


export type DecodedJWT = object | DecodedObject | undefined