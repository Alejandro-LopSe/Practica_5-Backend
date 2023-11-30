// deno-lint-ignore-file
// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Clientmodel, Clientmodeltype } from "../mogo/models/Client.ts";
import { Client , Errormongo} from "../mogo/types.ts";
import { Restaurantmodel, Restaurantmodeltype } from "../mogo/models/Restaurant.ts";
import { Bookingmodeltype, Bookingmodel } from "../mogo/models/Booking.ts";
import { geterror } from "../funcionesextra.ts";


export const postClient = async (req: Request<{},{},Clientmodeltype>, res: Response)=>{

    try{

        const {firstName,lastName,email,phoneNumber,DNI} = req.body
        const client = new Clientmodel({
            firstName,
            lastName,
            email,
            phoneNumber,
            DNI
        })
        const finalclient = await client.save()
        res.status(200).send(finalclient)

    }catch(error){   
        const er = geterror(error)
        console.log(er);
        
        res.status(400).send(er)
    }
}
export const postRestaurant = async (req: Request<{},{},Restaurantmodeltype>, res: Response)=>{

    try{

        const {name,CIF,address} = req.body
        const rest = new Restaurantmodel({
            name,
            CIF,
            address
        })
        const finalres = await rest.save()
        res.status(200).send(finalres)

    }catch(error){   
        const er = geterror(error)
        console.log(er);
        
        res.status(400).send(er)
    }
}
export const postBooking = async (req: Request<{},{},Bookingmodeltype>, res: Response)=>{

    try{

        const {client,restaurant,date} = req.body
        const book = new Bookingmodel({
            client,
            restaurant,
            date
        })
        
        const finalbook = await book.save()
        res.status(200).send(finalbook)

    }catch(error){   
        const er = geterror(error)
        console.log(er);
        
        res.status(400).send(er)
    }
}
