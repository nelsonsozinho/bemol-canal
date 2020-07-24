import { AddressController } from './controller/AddressController';
import { UserController } from './controller/UserController';
export const Routes = [

    //User
    {
        method: "get",
        route: "/user",
        controller: UserController,
        action: "all"
    },
    {
        method: "get",
        route: "/user/:id",
        controller: UserController,
        action: "one"
    },
    {
        method: "post",
        route: "/user/authentication",
        controller: UserController,
        action: "authentication"
    },
    {
        method: "post",
        route: "/user",
        controller: UserController,
        action: "save"
    },
    {
        method: "delete",
        route: "/user/:id",
        controller: UserController,
        action: "remove"
    }, {
        method: "put",
        route: "/user/:id",
        controller: UserController,
        action: "update"
    },

    //addres
    {
        method: "get",
        route: "/cep/:cep",
        controller: AddressController,
        action: "findAddressByCep"
    }

];