export const appConfiguration = () => ({
  port: +process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
});
