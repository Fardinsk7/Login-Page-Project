const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json()); 
app.use(cors());

const users = [
    {
        email: 'xyz@gmail.com',
        // Hashed password: bcrypt.hashSync('password123', 10)
        passwordHash: '$2b$10$6xZAJOtxoQ.vQ7imEeH1uO81qLolPeKPy07AhBCbNEKbAWTGv469a',
    },
    // Add more users as needed
];

// Completed with the demo Backend for login 
app.post("/login",async(req,res)=>{
    const{email,password} = req.body;
    const user = users.find(u=>u.email === email);
    const salt = 10;
    const hashPassword = await bcrypt.hash(password,salt);
    console.log(hashPassword);

    if(user && bcrypt.compareSync(password,user.passwordHash)){
        res.json({success:true});
    }
    else{
        res.json({success:false})
    }
})

app.listen(port,()=>{
    console.log(`Server is listening to http://localhost:${port}`);
})