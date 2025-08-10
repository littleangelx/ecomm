import { check } from "express-validator";

import usersRepo from "../../repositories/users.js";

export const requireEmail = check("email")
  .trim()
  .normalizeEmail()
  .isEmail()
  .withMessage("Must be a valid email")
  .custom(async (email) => {
    const existingUser = await usersRepo.getOneBy({ email });
    if (existingUser) {
      throw new Error("Email in use");
    }
  });

export const requirePassword = check("password")
  .trim()
  .isLength({ min: 4, max: 20 })
  .withMessage("Must be between 4 and 20 characters");

export const requirePasswordConfirmation = check("passwordConfirmation")
  .trim()
  .isLength({ min: 4, max: 20 })
  .withMessage("Must be between 4 and 20 characters")
  .custom((passwordConfirmation, { req }) => {
    if (passwordConfirmation !== req.body.password) {
      throw new Error("Passwords must match");
    }
  });

export const requireEmailExists = check("email")
  .trim()
  .normalizeEmail()
  .isEmail()
  .withMessage("Must provide a valid email")
  .custom(async (email) => {
    const user = await usersRepo.getOneBy({ email });
    if (!user) {
      throw new Error("Email not found");
    }
  });

export const requireValidPasswordForUser = check("password")
  .trim()
  .custom(async (password, { req }) => {
    const user = await usersRepo.getOneBy({ email: req.body.email });
    if (!user) {
      throw new Error("Invalid password");
    }
    const validPassword = await usersRepo.comparePasswords(
      user.password,
      password
    );
    if (!validPassword) {
      throw new Error("Invalid password");
    }
  });
