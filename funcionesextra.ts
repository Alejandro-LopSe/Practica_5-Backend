// deno-lint-ignore-file
import { Errormongo } from "./mogo/types.ts"

//Gestion de errores
export const geterror = (error: Object): Errormongo[]=>{

    const EM: Errormongo = error as Errormongo
    if(EM.code){
        if(EM.code===11000){
            return [{
                code: EM.code,
                errorOrigin: "MongoDB",
                Error: `ya existe este atibuto ${JSON.stringify(EM.keyValue)}`
            }]
        }
    }else if(EM.errors){
        const errores = Object.keys(EM.errors).map((elem)=>{

            return {
                code: 1,
                errorOrigin: "Mongo Error",
                Error: EM._message,
                path: EM.errors?.[elem].properties?.path,
                Cause: EM.errors?.[elem]._message,
                value: EM.errors?.[elem].properties?.value,
                type: EM.errors?.[elem].kind
            }
        })

        return errores
    }
    return [EM]
}