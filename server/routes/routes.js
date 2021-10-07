const express = require("express");
const app = express();
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../keys/keys");

const db = require("../db/db");

app.set("key", keys.key);

router.post("/api/create-user", async (req, res) => {
  let { username, password } = req.body;

  const sqlSearch = "SELECT * FROM user_admin";

  let passwordHash = await bcryptjs.hash(password, 8);

  db.query(sqlSearch, username, (err, result) => {
    const resultado = result.map((user) => {
      if (username === user.username) {
        res.json({ message: "El nombre de usuario ya está registrado" });
        username = "";
      }
    });

    if (username !== "") {
      const sqlCreateUser =
        "INSERT INTO user_admin (username, password) VALUES (?,?)";

      db.query(sqlCreateUser, [username, passwordHash], (err, result) => {
        res.status(200).send(result);
      });
    }
  });
});

router.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const searchUser = "SELECT * FROM user_admin WHERE username = ?";

  db.query(searchUser, username, async (err, result) => {
    try {
      if (result.length > 0) {
        bcryptjs.compare(password, result[0].password, (error, response) => {
          if (response) {
            const payload = {
              check: true,
            };

            const token = jwt.sign(payload, app.get("key"), {
              expiresIn: "1d",
            });

            const id = result[0].id_user;

            console.log("Llego");

            res.send({ access: "Access", token });
          } else {
            res.send({
              message: "Usuario y/o contraseña incorrecta",
              username,
            });
          }
        });
      } else {
        console.log("Usuario no existente");
        res.send({ message: "El usuario ingresado no existe" });
      }
    } catch (error) {
      console.log("Error");
      res.status(500).send({ message: "Something went wrong" });
    }
  });
});

router.post("/api/creating-user", (req, res) => {
  const { id, name, lastname, haircut } = req.body;

  const sqlInsertDataUser =
    "INSERT INTO user (id, name, lastname, haircut) VALUES (?,?,?,?);";

  db.query(sqlInsertDataUser, [id, name, lastname, haircut], (err, result) => {
    res.send(result);
  });
});

router.delete("/api/delete-user/:id", (req, res) => {
  const id = req.params.id;

  const deleteUser = "DELETE FROM user WHERE id = ?";

  db.query(deleteUser, id, (err, result) => {
    if (err) console.log(err);
  });
});

router.get("/api/get-data", (req, res) => {
  const sqlSelect = "SELECT * FROM user";

  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

router.put("/api/update", (req, res) => {
  const { id, name, lastname } = req.body;

  const sqlUpdate = "UPDATE user SET name = ?, lastname = ? WHERE  id = ?";

  db.query(sqlUpdate, [name, lastname, id], (err, result) => {
    if (err) console.log(err);
  });
});

router.get("/api/haircut-price", (req, res) => {
  const sqlSelect = "SELECT * FROM haircut_price";

  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

router.put("/api/update-price", (req, res) => {
  const { haircutPrice, id } = req.body;

  const sqlUpdatePrice =
    "UPDATE haircut_price SET price = ? WHERE id_price = ?";

  db.query(sqlUpdatePrice, [haircutPrice, id], (err, result) => {
    res.send(result);
  });
});

router.get("/api/get-bossearnings", (req, res) => {
  const sqlGetBossEarnings = "SELECT * FROM boss";

  db.query(sqlGetBossEarnings, (err, result) => {
    res.send(result);
  });
});

router.put("/api/update-bossearnings", (req, res) => {
  const { modifyBossEarnings, id } = req.body;

  const updateBossEarnings =
    "UPDATE boss SET boss_earnings = ? WHERE id_boss = ?";

  db.query(updateBossEarnings, [modifyBossEarnings, id], (err, result) => {
    res.send(result);
  });
});

router.put("/api/update-haircut", (req, res) => {
  const { haircutAddRemove, id } = req.body;

  const sqlUpdateHaircut = "UPDATE user SET haircut = ? WHERE id = ?";

  db.query(sqlUpdateHaircut, [haircutAddRemove, id], (err, result) => {
    res.send(result);
  });
});

router.put("/api/time-to-pay", (req, res) => {
  const sqlResetHaircut = "UPDATE user SET haircut = 0";

  db.query(sqlResetHaircut, (err, result) => {
    res.status(200).send(result);
  });
});

module.exports = router;
