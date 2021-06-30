export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: `${process.env.JWT_EXPIRATION_TIME_IN_SECONDS}s`,
};
