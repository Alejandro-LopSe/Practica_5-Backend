
import mongoose from "mongoose"
import { Booking } from "../types.ts"
import { Restaurantmodel } from "./Restaurant.ts";
import { Clientmodel } from "./Client.ts";

const Schema = mongoose.Schema



const Bookingschema = new Schema({
    client: {type: String, required: true,match: /^([a-z]|[0-9]){23}/},
    restaurant: {type: String, required: true,match: /^[a-z0-9]{23}/},
    date: {type: Date, match: /^2024(\/|-)(0[1-9]|1[0-2])(\/|-)[0-3][0-9]/, default: new Date()},
})

//midleware hooks
Bookingschema.post(`findOneAndDelete`,async (next)=>{ 
    await Restaurantmodel.findByIdAndUpdate(next.restaurant,{$pull: {bookings: next._id}})
    await Clientmodel.findByIdAndUpdate(next.client,{$pull: {bookings: next._id}})
})

Bookingschema.post(`save`,async (next)=>{ 
    await Restaurantmodel.findByIdAndUpdate(next.restaurant,{$push: {bookings: next._id}})
    await Clientmodel.findByIdAndUpdate(next.client,{$push: {bookings: next._id}})
})

//validators
Bookingschema.path("client").validate(async (c)=> {
    const client = await Clientmodel.findById(c)
    if(!client) return false
    return true
})
Bookingschema.path("restaurant").validate(async (r)=> {
    const res = await Restaurantmodel.findById(r)
    if(!res) return false
    return true
})



export type Bookingmodeltype = mongoose.Document & Booking
export const Bookingmodel = mongoose.model<Bookingmodeltype>("Booking",Bookingschema)