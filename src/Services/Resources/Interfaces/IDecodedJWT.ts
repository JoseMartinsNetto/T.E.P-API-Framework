// export default interface IDecodedJWT{
//     id: string
// }

export interface IDecodedObject {
    id: string
}

export type IDecodedJWT = object | IDecodedObject | undefined