
import mongoose  from "mongoose"
import { Restaurant} from "../types.ts" 
import { Bookingmodel } from "./Booking.ts";
import { Clientmodel } from "./Client.ts";




const Schema = mongoose.Schema


const Restaurantschema = new Schema({
   name: {type: String, required: true, unique: true},
   CIF: {type: String, match: /^[A-W]{1}[0-9]{8}/, required: true, unique: true},
   address: {type: String, required: true},
   bookings: [{type: Schema.Types.ObjectId}]
})

//Midleware hooks
Restaurantschema.post(`findOneAndDelete`, (next)=>{ 
   //@ts-expect-error<>
   next.bookings.forEach(async (e) => {
      await Bookingmodel.findByIdAndDelete(e)
   });
   
   
})
Restaurantschema.post(`deleteMany`, async ()=>{ 

   await Bookingmodel.deleteMany({})
   await Clientmodel.updateMany({},{bookings: []})
   
})


export type Restaurantmodeltype = mongoose.Document & Omit<Restaurant, "bookings"> & {
   bookings: mongoose.Types.ObjectId[]
}
export const Restaurantmodel = mongoose.model<Restaurantmodeltype>("Restaurant",Restaurantschema)