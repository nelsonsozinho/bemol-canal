import { UserController } from './controller/UserController';
import { PerfilController } from "./controller/PerfilController";
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

    //profile
    {
        method: "get",
        route: "/perfil/find-perfil",
        controller: PerfilController,
        action: "findPerfil"
    }, {
        method: "get",
        route: "/perfil/find-user-perfis",
        controller: PerfilController,
        action: "findPerfilByLoggedUser"
    }

];