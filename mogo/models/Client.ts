
import mongoose from "mongoose"
import { Client} from "../types.ts"

const Schema = mongoose.Schema


//tlf es requerido a peticion del profesor 
const Clientschema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, match: /^[A-Za-z0-9]*@[A-Za-z]*.[a-z]*/, required: true, unique:true},
    phoneNumber: {type: Number,min: 600000000,max: 999999999,required: true, unique:true},
    DNI: {type: String, required: true, unique:true, match: /[0-9]{8}[A-Z]/},
    bookings: [{type: Schema.Types.ObjectId}]
})

export type Clientmodeltype = mongoose.Document & Omit<Client, "bookings"> & {
    bookings: mongoose.Types.ObjectId[]
}
export const Clientmodel = mongoose.model<Clientmodeltype>("Client",Clientschema)