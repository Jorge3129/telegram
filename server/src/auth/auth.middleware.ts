import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { NextFunction, Request, Response } from 'express';
import { userRepository } from '../users/user.repository';
import { User } from '../users/user.type';
import { HttpException } from '../shared/errors';

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error('NO SECRET');
}

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await userRepository.findOneBy({ id: payload.id });

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

passport.use(jwtStrategy);

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: unknown, user?: User) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return next(new HttpException('Unauthorized', 401));
      }

      req.user = user;

      next();
    },
  )(req, res, next);
};

export default passport;
