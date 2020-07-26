
 # SSO Retail
nodejs 13
typeorm: 0.2.25 
postgres: 12
angular 9


## Docker compose
### Maneira mais fácil de executar

Para isso é necessário ter o docker e docker-compose instalado na máquina. Caso não possua, siga a documentação oficial para o processo de instalação: 

Docker: https://docs.docker.com/engine/install/
Docker Compose: https://docs.docker.com/compose/install/

Após isso, vá para o diretório docker rode o comando abaixo: 

```sh
docker-compose up -d
```

O processo demora um pouco, já que será necessário baixar as imagens buildar e configurar os containers. 

Apó isso, abra o navegador com o endereço ```http://localhost``` e utilize as credenciais 
```
    email: admin@admin.com
    password: admin
```

## Tradicional


### Back
.1 Configuração:
Utilizei o banco Postgres na versão 12 como banco relacional do projeto. Caso não tenha, siga os links para obter o produto e o manual de instalação: 

Download: https://www.postgresql.org/download/
Instalação: https://www.postgresql.org/docs/9.3/tutorial-install.html

Após isso, vá para o pacote ```sso-retail-back``` edite o arquivo ```ormconfig.json``` e edite as credenciais do seu bando. Inicialmente eu segui a seguinte configuração: 

```
   "type": "postgres",
   "host": "postgres_retail",
   "port": 5432,
   "username": "postgres",
   "password": "postgres",
   "database": "retail",     
```

Fique a vontade para configurar de acordo com a sua necessidade. 

Estou utilizando o Nodejs na versão 13. 
* Para instalar os pacotes digite npm install. 
* Estou utilizando o pacote da linguage typescript e ts-script. Para instalar globalmente execute os comandos abaixo: 
```
        npm install -g typescript
        npm install -g ts-node
```
* Para executar as migrações do banco execute: 
```
        ts-node node_modules/typeorm/cli.js migration:run
```
* Após isso rode o comando abaixo para execurtar o servidor
```
        ts-node src/index.ts
```  


### Front

O front foi feito em anguliar 9, portanto, poara executa-lo vá para o diretório do projeto ```sso-retail-front``` e execute o ```comando ng server``` para subir o front. 

    
### Acesso: 

O processo de migração deixa um usuário já pré cadastrado. Abra o navegador e acesse a URL http://localhost:4200 e utilize esse usuário para acessar o projeto: 
```
    email: admin@admin.com
    password: admin
```




