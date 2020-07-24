import { Address } from './../entity/Address';

import { compareSync, hashSync } from 'bcryptjs';
import { NextFunction, Request, Response } from "express";
import { sign } from 'jsonwebtoken';
import { getRepository, getManager } from 'typeorm';
import { UsuarioFilterQuery } from '../filter/usuario-filter-request';
import { User } from './../entity/User';
import { PageWrapper } from './../wrapper/page-wrapper';

export class UserController {
    
    private repository = getRepository(User);
    

    async all(request: Request, response: Response, next: NextFunction) {           
        const filter: UsuarioFilterQuery = new UsuarioFilterQuery(request.query);
        const wrapper = new PageWrapper<User>();
        var result = null;
        var count = null;
        
        if(filter.name || filter.login) {
            result = await this.repository.createQueryBuilder('user')
                .where('user.active = :active', {'active': filter.is_active})
                .andWhere('user.nome or user.email like :name', {'name': '%'+filter.name+'%'})
                .orderBy(filter.ordering)
                .skip(filter.limit*(filter.page))
                .take(filter.limit)
                .getMany();
            count = await this.repository.createQueryBuilder("user")
                .select(" COUNT(*) ", "sum")
                .andWhere('user.nome like :name', {'name': '%'+filter.name+'%'})
                .getRawOne();
        } else {
            result = await this.repository.createQueryBuilder('user')
                .where('user.active = :active', {'active': filter.is_active})
                .orderBy(filter.ordering)
                .skip(filter.limit*(filter.page))
                .take(filter.limit)
                .getMany();
            
            count = await this.repository.createQueryBuilder("user").select(" COUNT(*) ", "sum").getRawOne();
        }
        
        const hasNextPage = ((filter.page + 1) * filter.limit) <= count['sum'] ? true : false;

        wrapper.results = result;
        wrapper.count = parseInt(count['sum']);
        wrapper.next = hasNextPage ? wrapper.nextPage(filter.page) : -1;
        wrapper.previous = wrapper.previusPage(filter.page);

        return wrapper;        
    }

    async one(request: Request, response: Response, next: NextFunction) {

        const user = await this.repository.createQueryBuilder("user")
            .leftJoinAndSelect("user.address", "address")
            .andWhere("user.id = :id", {id: request.params.id})
            .getOne();

        // const user:User = await this.repository.findOne(request.params.id);
        user.password = '';
        return user;
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const password = await hashSync(request.body.password, 10);
        request.body.password = password;

        const user = await this.repository.createQueryBuilder("user")
        .where("user.email = :email", {email: request.body.email})
        .getOne();

        if(!user) {
            const entityManager = getManager();
            const newUser = new User();
            const newAddress = new Address();

            newAddress.bairro = request.body.address.bairro;
            newAddress.cep = request.body.address.cep;
            newAddress.complemento = request.body.address.complemento;
            newAddress.gia = request.body.address.gia;
            newAddress.uf = request.body.address.uf;
            newAddress.ibge = request.body.address.ibge;
            newAddress.localidade = request.body.address.localidade;
            newAddress.logradouro = request.body.address.logradouro;
            newAddress.unidade = request.body.address.unidade;            

            newUser.active = true;
            newUser.name = request.body.name;
            newUser.sexo = request.body.sexo;
            newUser.cpf = request.body.cpf;
            newUser.lastname = request.body.lastname;
            newUser.email = request.body.email;
            newUser.password = request.body.password;
            
            const savedAddress = await entityManager.save(newAddress);
            newUser.address = newAddress;
            const savedUser = await entityManager.save(newUser);

            return savedUser;
        }

        response.status(400).json({message: "Usuário com o login " + request.body.email + " já existe"});
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;
        const password = await hashSync(request.body.password, 10);
        
        const user = await this.repository.createQueryBuilder("user")
        .where("user.id = :id", {id: id})
        .getOne();

        


        return this.repository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let user = await this.repository.findOne(request.params.id);
        const result = await this.repository.delete(request.params.id);
        return response.send(result);
    }

    async authentication(request: Request, response: Response, next: NextFunction) {        
        var email = request.body.email;
        var password = request.body.password;
        
        const user = await this.repository.createQueryBuilder('user')
            .where('user.email = :email', {email: email})
            .getOne();

        if(!user) {
            response.status(400).json({error: "email ou senha invalidos !"});
        }

        if(!user.active) {
            response.status(400).json({error: "User inactive !"});
        }

        if(!(await compareSync(password, user.password))) {
            response.status(400).json({error: "login e senha invalidos !"});
        }
        
        var json = JSON.stringify({
            id: user.id,
            nome: user.name,
            email: user.email, 
            token: sign({id: user.id, email: user.email}, "secret", {
                expiresIn: 86400
            })
        });

        return json;
    }

}