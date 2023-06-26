import Joi from "joi";

const UserValidation = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.min": "Name must have a minimum length of {#limit}",
    "string.max": "Name should not exceed a maximum length of {#limit}",
    "any.required": "Name is required",
  }),
  username: Joi.string().when("role", {
    is: "user",
    then: Joi.string().min(5).max(30).required().messages({
      "string.min": "username must have a minimum length of {#limit}",
      "string.max": "username should not exceed a maximum length of {#limit}",
      "any.required": "Username is required",
    }),
    otherwise: Joi.string().email().required().messages({
      "string.email": "Username should be a valid email address",
      "any.required": "Username is required",
    }),
  }),
  pic: Joi.string().allow("").optional(),
  is_active: Joi.boolean().default(true),
  role: Joi.string().valid("admin", "user").default("user"),
  password: Joi.string()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    .message(
      "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit."
    )
    .required(),
}).options({
  abortEarly: false,
});

const forgotEmailValidation = Joi.object({
  username: Joi.string().email().required().messages({
    "string.email": "Username should be a valid email address",
    "any.required": "Username is required",
  }),
});

const resetPasswordValidation = Joi.object({
  password: Joi.string()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    .message(
      "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit."
    )
    .required(),
  token: Joi.string().required().messages({
    "any.required":"Token is  required"
  })
})

const loginValidation = Joi.object({
  password: Joi.string()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    .message(
      "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit."
    )
    .required(),
    username: Joi.string().min(5).max(30).required().messages({
        "string.min": "username must have a minimum length of {#limit}",
        "string.max": "username should not exceed a maximum length of {#limit}",
        "any.required": "Username is required",
      })
})

export { UserValidation, forgotEmailValidation, resetPasswordValidation,loginValidation };
