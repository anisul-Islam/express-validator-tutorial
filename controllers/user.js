const registerUser = async (req, res) => {
  try {
    const { name, email, password, dob } = req.body;
    const newUser = {
      name,
      email,
      password,
      dob,
    };
    return res.status(201).json({
      message: "user was created",
      newUser,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

const loginUser = (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === "anisul2010s@yahoo.co.uk" && password === "12345") {
      return res.status(200).json({
        message: "user was loggedIn",
      });
    } else {
      return res.status(400).json({
        message: "email/password is wrong",
      });
    }
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

module.exports = { registerUser, loginUser };
