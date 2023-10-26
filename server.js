const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const Role = db.role;
const app = express();
const dbConfig = require("./app/config/db.config")

// var corsOptions = {
//   origin: "http://localhost:8081"
// };
app.use(cors());



app.use(express.json());



db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    initial();
    console.log(`Connected to the database! ${dbConfig.DB}`);
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
  getAllRoles = async () => {
    const data = await Role.find({});
    return data;
  };
  function initial() {
    getAllRoles().then((data) => {
      if (data.length === 0) {
        const user_role = new Role({
          name: "user"
        });
        user_role.save(user_role).then(data => {
          console.log("added 'user' to roles collection");
        }).catch(err => {
          console.log("error while creating Role: user", err);
        });
        
        const mod_Role = new Role({
          name: "moderator"
        });
        mod_Role.save(mod_Role).then(data => {
          console.log("added 'moderator' to roles collection.");
        }).catch(err => {
          console.log("error while creating Role: moderator.", err);
        });
  
        const admin_Role = new Role({
          name: "admin"
        });
        admin_Role.save(admin_Role).then(data => {
          console.log("added 'admin' to roles collection");
        }).catch(err => {
          console.log("error while creating Role: admin", err);
        });
        
      }
    });
  }

 app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Homepage" });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 3456;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});