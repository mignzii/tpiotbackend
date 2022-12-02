import express, { response } from 'express'
import cors from 'cors'
import mysql from 'mysql'
import bodyParser from 'body-parser'

const db = mysql.createConnection({
    host: "mysql-electionageis.alwaysdata.net",
    user: "279238_vp",
    password: "passer@123",
    database: "electionageis_tpnodered"
  })
  db.connect((err) =>{
      if(err) throw err
      console.log("Connexion DB: OK")
  })
// Creation de l'application ........................................

const app = express()
app.use(bodyParser.json())
const PORT =  process.env.PORT || 6001 ;
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
// Activation des modules ...........................................

app.get('/getetat', (req,res,)=>{
    db.query("SELECT * FROM tpnodered ORDER BY id DESC LIMIT 1" , (err, reponse)=>{
        res.send(reponse)
        console.log(reponse)
    })
})
app.post('/commande',(req,res)=>{
    console.log(req.body.allumer)
    var etatallumer=req.body.allumer
    console.log(etatallumer)
    if(etatallumer=="allumer"){
        db.query("INSERT INTO tpnodered(etat)VALUES('Allumer')",(err,repon)=>{
            if (err) throw err
            else {
                res.send("la Lampe est allumée")
            }
        } )
    }
    else{   
        db.query("INSERT INTO tpnodered(etat)VALUES('Eteint')",(err,repon)=>{
            if (err) throw err
            else {
                res.send("la lampe est éteinte")
            }
        } )
    }
    
})

// Lancement de l'application .......................................

app.listen(PORT, ()=> console.log(`Le serveur fonctionne à l'adresse http://localhost:${PORT}`))