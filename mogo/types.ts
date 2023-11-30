// deno-lint-ignore-file
export type Client = {
    firstName: string
    lastName: string
    email: string
    phoneNumber: number
    DNI: string
    bookings: Array<Omit<Booking,"client">>
}

export type Booking = {
    date?: Date
    client: string
    restaurant: string
}

export type Restaurant = {
    name: string
    CIF: string
    address: string
    bookings: Array<Omit<Booking,"restaurant">>
}

//Tipo para gestion de errores
export type Errormongo = {
    code?: number
    errorOrigin?: string
    Error?: string
    keyValue?: {}
    errors?: {
        [key: string]: {
            properties?:  {
                message?: string
                type?: string
                path?: string
                value?: string 
            }
            kind?: string
            _message?: string
        }
    } 
    _message?: string

}

