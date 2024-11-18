const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const login = (request, response) => {
  const { username, password } = request.body;

  if (username === "professor.lucas" && password === "1234") {
    const payload = {
      sub: username,
      name: "Lucas José de Souza",
      iat: Math.floor(Date.now() / 1000),
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });
    return response.json({ message: "Login bem-sucedido!", token });
  }

  response.status(401).json({ message: "Credenciais inválidas" });
};

const protectedContent = (request, response) => {
  const token = request.headers["authorization"];

  if (!token) {
    return response.status(403).json({ message: "Token não fornecido" });
  }

  try {
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(bearerToken, secretKey);

    response.json({ message: "Conteúdo protegido acessado!", user: decoded });
  } catch (error) {
    return response.status(403).json({ message: "Token inválido ou expirado" });
  }
};

const users = (request, response) => {
  const token = request.headers["authorization"];

  if (!token) {
    return response.status(403).json({ message: "Token não fornecido" });
  }

  try {
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(bearerToken, secretKey);
    const users = [
      {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com'
      },
      {
          id: 2,
          name: 'Jane Smith',
          email: 'jane.smith@example.com'
      },
      {
          id: 3,
          name: 'Alice Johnson',
          email: 'alice.johnson@example.com'
      }
  ];

    response.json({ message: "Couteudo protegido da rota aleatoria acessado, parabens!", users });
  } catch (error) {
    return response.status(403).json({ message: "Token inválido ou expirado" });
  }
};

const products = (request, response) => {
  const token = request.headers["authorization"];

  if (!token) {
    return response.status(403).json({ message: "Token não fornecido" });
  }

  try {
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(bearerToken, secretKey);
    const products = [
      {
          id: 1,
          name: 'Laptop',
          price: 1500.00
      },
      {
          id: 2,
          name: 'Smartphone',
          price: 800.00
      },
      {
          id: 3,
          name: 'Tablet',
          price: 600.00
      }
  ];

    response.json({ message: "Parabens por acessar a rota teste, esse conteudo é protegido!", products });
  } catch (error) {
    return response.status(403).json({ message: "Token inválido ou expirado" });
  }
};

module.exports = { login, protectedContent, users, products };
