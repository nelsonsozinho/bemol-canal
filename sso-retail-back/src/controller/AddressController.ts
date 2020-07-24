import { Response } from 'express';
import { NextFunction } from 'express';
import { Request } from 'express';
import axios from "axios";



export class AddressController {

    async findAddressByCep(request: Request, response: Response, next: NextFunction) {
        const cep: string = request.params.cep;
        let resp: any = null;

        try {
            resp = await axios({method: "GET", url: `http://viacep.com.br/ws/${cep}/json`});
        } catch(error) {
            response.status(400).json({message: "Dados do " + cep + " não foram encontrados"});
        }

        return resp ? resp.data : null;
    }

}