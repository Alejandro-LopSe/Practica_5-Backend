// deno-lint-ignore-file

// @deno-types="npm:@types/express@4"

import { Request, Response } from "express";
import { Clientmodel, Clientmodeltype } from "../mogo/models/Client.ts";
import { Booking, Client, Errormongo, Restaurant } from "../mogo/types.ts";
import { Restaurantmodel, Restaurantmodeltype } from "../mogo/models/Restaurant.ts";
import { Bookingmodeltype, Bookingmodel } from "../mogo/models/Booking.ts";
import { geterror } from "../funcionesextra.ts";



export const delBooking = async (req: Request<{id: string},{},{}>, res: Response<string>)=>{

    try{

        const {id} = req.params

        const finalclient = await Bookingmodel.findByIdAndDelete(id)

        res.status(200).send("Booking, Eliminado")
        

    }catch(error){
        console.log(error);
        
        res.status(400).send(error.message)
    }
}
export const delRestaurant = async (req: Request<{id: string},{},{}>, res: Response<string | Errormongo[]>)=>{

    try{

        const {id} = req.params

        const finalclient = await Restaurantmodel.findByIdAndDelete(id)

        res.status(200).send("Restaurant, Eliminado")
        

    }catch(error){
        const er: Errormongo[] = geterror(error)
        console.log(er);
        
        res.status(400).send(er)
    }
}
export const delallRestaurants = async (req: Request<{},{},{}>, res: Response<string | Errormongo[]>)=>{

    try{

        const finalclient = await Restaurantmodel.deleteMany({})

        res.status(200).send("Restaurantes, Eliminados")
        

    }catch(error){
        const er: Errormongo[] = geterror(error)
        console.log(er);
        
        res.status(400).send(er)
    }
}

//borrado de todas las colecciones
export const delall = async (req: Request<{},{},{}>, res: Response<string | Errormongo[]>)=>{

    try{


        const finalclient = await Restaurantmodel.deleteMany({})
        await Clientmodel.deleteMany({})
        await Bookingmodel.deleteMany({})

        res.status(200).send("xxxxxxxxxxxxxxxxxxxxx")
        

    }catch(error){
        const er: Errormongo[] = geterror(error)
        console.log(er);
        
        res.status(400).send(er)
    }
}