const express = require("express");
const { login, protectedContent, users, products } = require("./controllers/authController");

const router = express.Router();

// Rota pública
router.get("/", (request, response) => {
  response.json({ message: "Endpoint que não exige autenticação!" });
});

// Rota de login
router.post("/login", login);

// Rota protegida
router.get("/protected", protectedContent);

//Rotas protegidas criadas
router.get("/users", users)

router.get("/products", products)

module.exports = router;
