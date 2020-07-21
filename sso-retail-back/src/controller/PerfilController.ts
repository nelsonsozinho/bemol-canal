import { User } from './../entity/User';
import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Perfil } from "../entity/Perfil";
import {verify} from 'jsonwebtoken';


export class PerfilController {

    private repository = getRepository(Perfil);
    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.repository.find();        
    }

    /**
     * Get a profile list from user logged
     * 
     * @param request 
     * @param response 
     * @param next 
     */
    async findPerfilByLoggedUser(request: Request, response: Response, next: NextFunction) {
        var token: string = request.headers['authorization'].replace('Bearer', '').trim();
        var user: User = null;

        try {
            var payload = verify(token, 'secret');
            user = await this.userRepository.findOne(payload);
        } catch(error) {
            console.log(error);
        }

        return await this.repository.createQueryBuilder("perfil")
            .leftJoin("perfil.users", "user")
            .where("user.codigo = :codigo", {codigo: user.id})
            .getMany();
    }


    async findPerfil(request: Request, response: Response, next: NextFunction) {
        return await this.repository.createQueryBuilder("perfil")
            .innerJoinAndSelect("perfil.perfilRotinas", "perfilRotinas")
            .innerJoinAndSelect("perfilRotinas.rotina", "rotina")
            .printSql()
            .getMany();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.repository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.repository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.repository.findOne(request.params.id);
        await this.repository.remove(userToRemove);
    }
    
}