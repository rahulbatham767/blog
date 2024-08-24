// src/schemas/userSchema.js

const { z } = require("zod");

const userSchema = z.object({
  firstname: z.string().nonempty("First name is required"),
  lastname: z.string().nonempty("Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

module.exports = userSchema;
