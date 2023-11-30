// deno-lint-ignore-file

// @deno-types="npm:@types/express@4"

import { Request, Response } from "express";
import { Clientmodel, Clientmodeltype } from "../mogo/models/Client.ts";
import { Booking, Client, Restaurant } from "../mogo/types.ts";
import { Restaurantmodel, Restaurantmodeltype } from "../mogo/models/Restaurant.ts";
import { Bookingmodeltype, Bookingmodel } from "../mogo/models/Booking.ts";


export const getClient = async (req: Request<{id: string},{},{}>, res: Response<Client>)=>{

    try{

        const {id} = req.params

        const finalclient = await Clientmodel.findById(id)
        res.status(200).send({
            firstName: finalclient!.firstName,
            lastName: finalclient!.lastName,
            email: finalclient!.email,
            phoneNumber: finalclient!.phoneNumber,
            DNI: finalclient!.DNI,
            //@ts-expect-error
            bookings: await Promise.all( finalclient!.bookings.map(async (book )=>{
                const b = await Bookingmodel.findById(book)
                const r = await Restaurantmodel.findById(b?.restaurant)
                return {
                    date: b?.date,
                    restaurant: {
                        name: r?.name,
                        address: r?.address
                    }
                }
            }))
        })

    }catch(error){
        console.log(error);
        
        res.status(400).send(error.message)
    }
}
export const getRestaurant = async (req: Request<{id: string},{},{}>, res: Response<Restaurant>)=>{

    try{

        const {id} = req.params

        const finalclient = await Restaurantmodel.findById(id)
        res.status(200).send({
            name: finalclient!.name,
            CIF: finalclient!.CIF,
            address: finalclient!.address,
            //@ts-expect-error
            bookings: await Promise.all( finalclient!.bookings.map(async (book )=>{
                const b = await Bookingmodel.findById(book)
                const c = await Clientmodel.findById(b!.client)
                return {
                    date: b!.date,
                    client: {
                        firstName: c!.firstName,
                        email: c!.email,
                        phoneNumbre: c!.phoneNumber,

                    }
                }
            }))
        })

    }catch(error){
        console.log(error);
        
        res.status(400).send(error.message)
    }
}
export const getBooking = async (req: Request<{id: string},{},{}>, res: Response<Booking>)=>{

    try{

        const {id} = req.params

        const finalclient = await Bookingmodel.findById(id)
        const r = await Restaurantmodel.findById(finalclient!.restaurant)
        const c = await Clientmodel.findById(finalclient!.client)
        res.status(200).send({
            //@ts-expect-error
            client: {
                firstName: c!.firstName,
                email: c!.email,
                phoneNumbre: c!.phoneNumber,
            },
            //@ts-expect-error
            restaurant: {
                name: r!.name,
                address: r!.address
            },
            date: finalclient!.date,
        })

    }catch(error){
        console.log(error);
        
        res.status(400).send(error.message)
    }
}