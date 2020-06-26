const express = require("express");
const database = require("./datebase");
const server = express();
server.use(express.json());

server.get("/", (req,res)=>{
    return res.json({
        result:"API-with-date-base"
    });
});

server.get("/users", async(req,res)=>{
    let users;
    await database.query(`SELECT * FROM users`, {type: database.QueryTypes.SElECT})
        .then(results =>{
            users = results;
        }) 
        .catch(err =>{
            return res.json("erro ao buscar usuários");
        })
    return res.json({users});
});

server.post("/users", async (req,res)=>{

    let inseriu;
    const {id, name, age, phone, email} = req.body;

    await database.query(`INSERT INTO users VALUES(${id},'${name}',${age},'${phone}','${email}');`,
        {type: database.QueryTypes.INSERT})
        .then(result =>{
            inseriu = result
        })
        .catch(err =>{
            return res.json(err);
        });
    if (inseriu[1]) {
        return res.json("usuário inserido com sucesso");
    } else {
        return res.json("não foi possivel cadastrar o usuário");
    }    
    
});

server.listen(process.env.PORT);