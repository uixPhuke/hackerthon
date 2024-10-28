const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userCtrl = {
  // Register a new user
  registerUser: async (req, res) => {
    try {
      const {
        username,
       firstName,   // New field
        lastName,     // New field
        email,
        password,
        phone, 
        role,
        profileImage,
        bio,
        address,
        location
      } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters long" });

      // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        firstName,   // New field
        lastName,     // New field
        phone, 
        email,
        password: hashedPassword,
        role,
        profileImage,
        bio,
        address, // Include address
        location // Include location
      });

      await newUser.save();

      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "None", // For cross-origin requests
        secure: true,
      });
      const userData = {
        _id: newUser._id,
        username: newUser.username,
               
        firstName: newUser.firstName,   // Include new field
                lastName: newUser.lastName ,      // Include new field
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,   
        profileImage: newUser.profileImage,
        bio: newUser.bio,
        address: newUser.address, // Include address in user data
        location: newUser.location // Include location in user data
      };

      res.json({ accesstoken, user: userData });
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error });
    }
  },

  // Refresh token handler
  refreshtoken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token)
        return res.status(400).json({ msg: "Please login or register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "Please login or register" });

        const accesstoken = createAccessToken({ id: user.id });
        res.json({ accesstoken, user });
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Login a user
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Create and assign JWT tokens
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "None", // For cross-origin requests
        secure: true,
      });
      const userData = {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        address: user.address, // Include address
        location: user.location // Include location
      };

      res.json({ accesstoken, user: userData });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  },

  logoutUser: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Log Out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Get all users
  getUsers: async (req, res) => {
    try {
      const users = await User.find().select("-password"); // Exclude password
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  },

  // Get a single user by ID
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  },

  // Update a user
  updateUser: async (req, res) => {
    try {
      const updates = req.body;
      if (updates.address) {
        updates.address = {
            street: updates.address.street,
            city: updates.address.city,
            state: updates.address.state,
            zipCode: updates.address.zipCode,
            country: updates.address.country,
        };
    }

    // If location coordinates are provided, set them in GeoJSON format
    if (updates.longitude && updates.latitude) {
        updates.location = {
            type: 'Point',
            coordinates: [updates.longitude, updates.latitude]
        };
    }

   

      if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 12);
      }

      const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
        new: true,
      }).select("-password");

      if (!updatedUser)
        return res.status(404).json({ message: "User not found" });

      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  },

  // Delete a user
  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);

      if (!deletedUser)
        return res.status(404).json({ message: "User not found" });

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
  },

  // Google Sign-In
  signInGoogle: async (req, res) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
      // Check if the user already exists
      const user = await User.findOne({ email });

      if (user) {
        // User exists, generate access token
        const accesstoken = createAccessToken({ id: user._id });
        const refreshtoken = createRefreshToken({ id: user._id });

        // Set refresh token in cookie
        res.cookie("refreshtoken", refreshtoken, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          sameSite: "None", // For cross-origin requests
          secure: true, // Ensure secure cookie in production (HTTPS)
        });

        const userData = {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage,
          bio: user.bio,
          address: user.address, // Include address
          location: user.location // Include location
        };

        res.json({ accesstoken, user: userData });
      } else {
        // New user registration
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8); // Generate random password
        const hashedPassword = await bcrypt.hash(generatedPassword, 12); // Hash the password

        // Create new user with Google profile information
        const newUser = new User({
          username:
            name.toLowerCase().split(" ").join("") +
            Math.random().toString(9).slice(-4),
          email,
          password: hashedPassword,
          profileImage: googlePhotoUrl,
          address: {}, // Initialize address if needed
          location: {} // Initialize location if needed
        });

        // Save the new user in the database
        await newUser.save();

        // Generate access token for the new user
        const accesstoken = createAccessToken({ id: newUser._id });
        const refreshtoken = createRefreshToken({ id: newUser._id });

        // Set refresh token in cookie
        res.cookie("refreshtoken", refreshtoken, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          sameSite: "None", // For cross-origin requests
          secure: true, // Ensure secure cookie in production (HTTPS)
        });

        const userData = {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
          profileImage: newUser.profileImage,
          bio: newUser.bio,
          address: newUser.address, // Include address
          location: newUser.location // Include location
        };

        res.json({ accesstoken, user: userData });
      }
    } catch (error) {
      res.status(500).json({ message: "Error during Google Sign-In", error });
    }
  },
  // Google Sign-In
  signInGoogle: async (req, res) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
      // Check if the service provider already exists
      const provider = await ServiceProvider.findOne({ email });

      if (provider) {
        // Provider exists, generate access token
        const accesstoken = createAccessToken({ id: provider._id });
        const refreshtoken = createRefreshToken({ id: provider._id });

        // Set refresh token in cookie
        res.cookie("refreshtoken", refreshtoken, {
          httpOnly: true,
          path: "/provider/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          sameSite: "None", // For cross-origin requests
          secure: true,
        });

        const providerData = {
          _id: provider._id,
          firstName: provider.firstName,
          lastName: provider.lastName,
          email: provider.email,
          contactInfo: provider.contactInfo,
          availability: provider.availability,
          ratings: provider.ratings,
          servicesOffered: provider.servicesOffered,
          profileImage: provider.profileImage,
        };

        res.json({ accesstoken, provider: providerData });
      } else {
        // New provider registration
        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(generatedPassword, 12);

        // Create new provider with Google profile information
        const newProvider = new ServiceProvider({
          firstName: name.split(" ")[0],
          lastName: name.split(" ")[1] || "",
          email,
          password: hashedPassword,
          profileImage: googlePhotoUrl,
          contactInfo: "", // Initialize contactInfo if needed
          availability: [], // Initialize availability if needed
          servicesOffered: [], // Initialize servicesOffered if needed
          serviceArea: {
            type: "Point",
            coordinates: [0, 0], // Set default coordinates
          },
        });

        await newProvider.save();

        // Generate access token for the new provider
        const accesstoken = createAccessToken({ id: newProvider._id });
        const refreshtoken = createRefreshToken({ id: newProvider._id });

        // Set refresh token in cookie
        res.cookie("refreshtoken", refreshtoken, {
          httpOnly: true,
          path: "/provider/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          sameSite: "None", // For cross-origin requests
          secure: true,
        });

        const providerData = {
          _id: newProvider._id,
          firstName: newProvider.firstName,
          lastName: newProvider.lastName,
          email: newProvider.email,
          contactInfo: newProvider.contactInfo,
          availability: newProvider.availability,
          ratings: newProvider.ratings,
          servicesOffered: newProvider.servicesOffered,
          profileImage: newProvider.profileImage,
        };

        res.json({ accesstoken, provider: providerData });
      }
    } catch (error) {
      res.status(500).json({ message: "Error during Google Sign-In", error });
    }
}
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userCtrl;
