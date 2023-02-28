const express = require('express');
const mysql = require('mysql');
const app = express();

const port = process.env.PORT || 80;
const config = {
    host     : 'sql9.freemysqlhosting.net',
    user     : 'sql9601493',
    password : 'HyWy1H38B3',
    database : 'sql9601493',
    port: 3306,
    ssl: false
}
console.log("hello word");
var connection = mysql.createConnection(config);
/*
connection.connect(function(erro){
    if(erro){
        console.log('Erro no my sql: '+erro);
    }
    else{
        console.log('mysql ok');
       
        connection.query("INSERT INTO leaderboard (Name,Score) VALUES('player2','18')",function(err,results,field){
            if (err) {
                console.log('Erro insert: '+erro);
            }else{
                console.log('id do insert: '+results.insertId);
            }
        });
        
       
       connection.query("UPDATE leaderboard SET Score ='2' WHERE ID =2",function(err,results,field){
        if (err) {
            console.log('Erro update: '+erro);
            connection.rollback();
        }else{
            console.log('dados alterados: '+results.changedRows);
        }
        
       });

        connection.query('SELECT * FROM leaderboard',function(err,results,field){
            if (err) {
                console.log('Erro sql: '+erro);
                connection.rollback();
            }else{
                console.log('select: '+results[0].Score);
            }
        });
        connection.end();
    }
}
);
*/
app.listen(port,function(){
    console.log('Servidor escutando na porta: ' + port)
})
app.get('/login',function(req,res){
    console.log("entrando no get/login");
    var msg_res ={};
    msg_res.status_code = 200;
    msg_res.msg_text = "";

    connection.connect(function(erro){
        if(erro){
            console.log('Erro no my sql: '+erro);
        }
        else{
            console.log('mysql ok'); 
            connection.query('SELECT * FROM leaderboard',function(err,results,field){
                if (err) {
                    console.log('Erro sql: '+erro);
                    msg_res.msg_text = "erro: "+erro;
                    connection.rollback();
                }else{
                    console.log('select: '+results[0].Score);
                    msg_res.msg_text = results;
                }
            });
            connection.end();
        }
    }
    );

    connection.end();

    res.status(msg_res.status_code).json(msg_res);
})

app.post('/inserir',function(req,res){
    console.log("entrando no get/login");
    var msg_res ={};
    msg_res.status_code = 200;
    msg_res.msg_text = "";

    var dados = {};
    dados  = req.body;

    res.status(msg_res.status_code).json(msg_res);
})