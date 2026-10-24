import jwt from "jsonwebtoken";

const SECRET_KEY = "my_secret_key";

export const generateAuthToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  return token;
};