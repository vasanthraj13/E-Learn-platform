const db = require("../utils/config");
const jwt = require('jsonwebtoken');
const CustomError = require("../utils/customError");

const getUser = async (req, res) => {
  try {
    const user = await db.User.findMany();
    if (!user) {
      throw new CustomError("Error retrieving users", 500); // More specific error message
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const profile = async (req, res) => {
  try {
    const data = req.body
    console.log(data.id)
    // Fetch user details from the database
    const user = await db.User.findUnique({
      where: {
        id: parseInt(data.id) // Assuming you have the user ID in the request object (e.g., from authentication middleware)
      }
    });

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    // Send user details as response
    res.status(200).json({
      message: "User details fetched successfully",
      user: {
        id: user.id,
        username: user.username,
        name:user.name,
        email: user.email,
        // Add other user details as needed
      }
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

const RegisterUser = async (req, res) => {
  const { name, username, password,  email } = req.body;

  try {
    const existingUser = await db.User.findUnique({
      where: { username },
    }); 

    if (existingUser) {
      throw new CustomError("Username already exists", 400);
    }

    const user = await db.User.create({
      data: {
        name,
        username,
        password,
        email,
              },
    });

    if (!user) {
      throw new CustomError("Error creating user", 500);
    }
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const userlogin = async (req, res) => {
  const { userName, password, role } = req.body;

  try {
    if (!userName || !password) {
      throw new CustomError("Username and password are required", 400);
    }

    let payload;
    if (role === 'user') {
      payload = await db.User.findUnique({
        where: { username: userName },
      });
    } else if (role === 'admin') {
      payload = await db.Admin.findUnique({
        where: { username: userName },
      });
    } else {
      throw new CustomError("Invalid role specified", 400);
    }

    if (!payload || payload.password !== password) {
      throw new CustomError("Incorrect username or password", 401);
    }

    const token = jwt.sign({
      userName: payload.username,
      userId: payload.id,
      role,
    }, process.env.SECRET_KEY);

    if (!token) {
      throw new CustomError("Error creating token", 500);
    }

    res.status(200).json({ token, role,payload });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const userCurrentController = async (req, res) => {
  try {
    if (!req.user) {
      throw new CustomError("Authorization token invalid or missing", 401);
    }
    res.status(200).json(req.user);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
  getUser,
  RegisterUser,
  userlogin,
  userCurrentController,
  profile
};