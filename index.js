const express = require('express');
const mysql = require('mysql');
const app = express();


const cors = require('cors');
// Seus domínios permitidos devem estar aqui
const allowedOrigins = ['https://gabrielchavesalencar.github.io']; 
const corsOption = {
    origin: allowedOrigins,
};

app.use(cors(corsOption));









const port = process.env.PORT || 80;
const config = {
    host     : 'sql9.freemysqlhosting.net',
    user     : 'sql9601493',
    password : 'HyWy1H38B3',
    database : 'sql9601493',
    port: 3306,
    ssl: false
}
console.log("hello word0");

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
app.get('/login',cors(corsOption),function(req,res){
    console.log("entrando no get/login");
    var msg_res ={};
    msg_res.status_code = 200;
    msg_res.msg_text = "";

    connection.connect(function(erro){
        if(erro){
            console.log('Erro no my sql: '+erro);
            msg_res.msg_text = "Erro no mysql: "+erro;
            connection.end();
            res.status(msg_res.status_code).json(msg_res);
        }
        else{
            console.log('mysql ok'); 
            connection.query('SELECT * FROM leaderboard ORDER BY Score DESC',function(err,results,field){
                if (err) {
                    console.log('Erro sql: '+erro);
                    msg_res.msg_text = "erro no select: "+erro;
                    connection.rollback();
                    connection.end();
                    res.status(msg_res.status_code).json(msg_res);
                }else{
                    console.log('select: '+results[0].Score);
                    for (let index = 0; index < results.length; index++) {
                        msg_res.msg_text += "*/Name: " + results[index].Name + " *#Score: " + results[index].Score+" ";
                        
                    }

                    
                    res.status(msg_res.status_code).send(msg_res.msg_text);
                    connection.end();
                }
            });
            
        }
    });

    

    
})

app.post('/score/:nome/:pontuacao',cors(corsOption),function(req,res){
    var msg_res ={};
    msg_res.status_code = 200;
    msg_res.msg_text = "";
    msg_res.qeri = "INSERT INTO leaderboard (Name,Score) VALUES('"+req.params.nome+"',"+req.params.pontuacao+")";
    msg_res.qeri2 = "UPDATE leaderboard SET Score ="+req.params.pontuacao+" WHERE Name = '"+req.params.nome+"'";
    msg_res.qeri3 = "SELECT * FROM leaderboard WHERE Name = '"+req.params.nome+"'";
    msg_res.tamanho = 0;
   



    
    connection.connect(function(erro){
        if(erro){
            
            msg_res.msg_text = "Erro no mysql: "+erro;
            connection.end();
            res.status(msg_res.status_code).json(msg_res);
        }
        else{
            connection.query(msg_res.qeri3,function(err,results,field){
                if (err) {
                    console.log('Erro sql: '+erro);
                    msg_res.msg_text = "erro no select: "+erro;
                    connection.rollback();
                    res.status(msg_res.status_code).json(msg_res);
                    connection.end();
                   
                }else{
                    if(results[0] !=null){
                        msg_res.tamanho = 1;
                        msg_res.msg_text = results[0].Name;
                    }
                    if(msg_res.tamanho==0){
                        connection.query(msg_res.qeri,function(err,results,field){
                            if (err) {
                                msg_res.msg_text = "erro no insert: "+erro +" nome: "+ req.params.nome;
                                connection.rollback();
                                connection.end();
                                res.status(msg_res.status_code).json(msg_res);
                            }else{
                                msg_res.msg_text = "inserido com sucesso tamanho: "+ msg_res.tamanho;
                                
                                res.status(msg_res.status_code).json(msg_res);
                                connection.end();
                            }
                        });
                    }
                    else{
                        connection.query(msg_res.qeri2,function(err,results,field){
                            if (err) {
                                msg_res.msg_text = "erro no insert: "+erro +" nome: "+ req.params.nome;
                                connection.rollback();
                                connection.end();
                                res.status(msg_res.status_code).json(msg_res);
                            }else{
                                msg_res.msg_text += "atualizado com sucesso";
                                
                                res.status(msg_res.status_code).send(msg_res.msg_text);
                                connection.end();
                            }
                        });
                    }
                    
                }
            
                

            });
            
        }
    });
   
    


    
})