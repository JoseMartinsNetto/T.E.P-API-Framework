import { Document } from 'mongoose'

export default interface IUser extends Document{
    name: string;
    username: string;
    email: string;
    phone: string;
    userType: string;
    cellPhone?: string;
    password: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
}
