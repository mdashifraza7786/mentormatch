import 'dotenv/config';
import express from 'express';
import { json } from 'express';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from 'express-fileupload';
import Mentor from './schema/Mentor.js';
import Mentee from './schema/Mentee.js';
import Chat from './schema/Chat.js';
// import Message from './schema/Message.js';
import './db/config.js';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import http from 'http';
import { Server } from 'socket.io';


const app = express();
const PORT = process.env.PORT || 5001;
const jwtKey = process.env.JWT_KEY || 'makematch'; // Use environment variable for security

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});

// Middleware
app.use(json());
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
app.use(fileUpload({ useTempFiles: true }));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join a room
    socket.on("joinRoom", async (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);

        // Send chat history to the user
        const messages = await Message.find({ chatId: roomId }).sort({ timestamp: 1 });
        socket.emit("chatHistory", messages);
    });

    // Handle sending messages
    socket.on("sendMessage", async ({ roomId, senderId, text }) => {
        try {
            // Store the message in the database
            const newMessage = new Message({
                chatId: roomId,
                senderId,
                text,
            });
            await newMessage.save();

            // Update the last message in the chat
            await Chat.findOneAndUpdate(
                { roomId },
                {
                    lastMessage: {
                        senderId,
                        text,
                        timestamp: new Date(),
                    },
                }
            );

            // Broadcast the message to the room
            const message = {
                chatId: roomId,
                senderId,
                text,
                timestamp: newMessage.timestamp,
            };
            io.to(roomId).emit("receiveMessage", message);
        } catch (error) {
            console.error("Error saving message:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});


// Helper function for user queries
const getUsers = async (model, query, resp) => {
    try {
        const users = await model.find(query);
        resp.send(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        resp.status(500).send({ error: "Something went wrong" });
    }
};

app.post('/photo_upload', async (req,res) =>{
    const photo = req.files.photo;
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validImageTypes.includes(photo.mimetype)) {
      return res.status(400).json({ error: 'Uploaded file is not a valid image.' });
    }

    // Upload photo to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(photo.tempFilePath);
    res.status(201).json({ photo_url: uploadResult.secure_url });


})

// Register API
app.post('/register', async (req, res) => {
    try {
      const { type, name, email, mobile, password,photo_url, skills, experience, availability, charges,bio } = req.body;
      const photourl = req.body.photo_url;
  
      // Validate required fields
      if (!type || !name || !email || !mobile || !password || !skills) {
        return res.status(400).json({ error: 'All fields are required, including at least one skill.' });
      }
  
      // Parse skills and experience
      const parsedSkills = Object.values(skills);
      const parsedExperience = type === 'mentor' ? Object.values(experience) : [];
  
      // Check if skills array is empty
      if (parsedSkills.length === 0) {
        return res.status(400).json({ error: 'At least one skill is required.' });
      }
  
      // Check if the email or mobile is already registered
      const existingUser = await Mentor.findOne({ email }) || await Mentee.findOne({ email }) ||
        await Mentor.findOne({ mobile }) || await Mentee.findOne({ mobile });
  
      if (existingUser) {
        return res.status(400).json({ error: 'Email or Mobile is already registered.' });
      }
  
      // Validate user type
      const UserModel = type === 'mentor' ? Mentor : type === 'mentee' ? Mentee : null;
      if (!UserModel) {
        return res.status(400).json({ error: 'Invalid user type.' });
      }
  
      // Hash password
      const hashedPassword = await hash(password, 9);
  
      // Create and save user
      const user = new UserModel({
        name,
        email,
        mobile,
        bio,
        password: hashedPassword,
        skills: parsedSkills,
        role:type,
        type,
        ...(type === 'mentor' && { experience: parsedExperience, availability, charges }), // Include mentor-specific fields
        photo: photo_url, // Use secure URL from Cloudinary
      });
  
      const savedUser = await user.save();
  
      // Generate JWT token
      const token = jwt.sign({ id: savedUser._id, type }, jwtKey, { expiresIn: '26h' });
  
      res.status(201).json({ user: savedUser, auth: token });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

// Login API
app.post('/login', async (req, res) => {
    try {
        const { identifier, password } = req.body;

        // Validate identifier format (email or mobile)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[0-9]{10}$/;

        const fieldName = emailRegex.test(identifier)
            ? 'email'
            : mobileRegex.test(identifier)
                ? 'mobile'
                : null;

        if (!fieldName) {
            return res.status(400).json({ error: "Invalid identifier format. Use a valid email or mobile number." });
        }

        // Find user in Mentor or Mentee collections
        const user =
            await Mentor.findOne({ [fieldName]: identifier }) ||
            await Mentee.findOne({ [fieldName]: identifier });

        // Check if user exists and password is correct
        if (!user || !(await compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid email/mobile or password." });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, type: user instanceof Mentor ? 'mentor' : 'mentee' },
            jwtKey,
            { expiresIn: "26h" }
        );

        // Send user data and token
        res.status(200).json({ user, auth: token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error. Please try again later.", details: error.message });
    }
});


// Get all mentors API
app.get('/allmentors', async (req, resp) => {
    try {
        const mentors = await Mentor.find();
        resp.send(mentors);
    } catch (error) {
        console.error("Error fetching mentors:", error);
        resp.status(500).send({ error: "Something went wrong" });
    }
});

// Get all mentees API
app.get('/allmentees', async (req, resp) => {
    try {
        const mentees = await Mentee.find();
        resp.send(mentees);
    } catch (error) {
        console.error("Error fetching mentees:", error);
        resp.status(500).send({ error: "Something went wrong" });
    }
});

// Get mentor by ID, skill, name, or email
app.get('/mentor', (req, resp) => {
    const { id, skill, name, email } = req.query;
    const query = {
        ...(id && { _id: id }),
        ...(skill && { skills: { $regex: skill, $options: 'i' } }),
        ...(name && { name: { $regex: name, $options: 'i' } }),
        ...(email && { email }),
    };
    getUsers(Mentor, query, resp);
});

// Get mentee by ID, skill, name, or email
app.get('/mentee', (req, resp) => {
    const { id, skill, name, email } = req.query;
    const query = {
        ...(id && { _id: id }),
        ...(skill && { skills: { $regex: skill, $options: 'i' } }),
        ...(name && { name: { $regex: name, $options: 'i' } }),
        ...(email && { email }),
    };
    getUsers(Mentee, query, resp);
});

// Delete user by ID (mentor or mentee)
app.delete('/user/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const deletedUser = await Mentor.findByIdAndDelete(id) || await Mentee.findByIdAndDelete(id);
        if (!deletedUser) {
            return resp.status(404).send({ error: "User not found" });
        }
        resp.send({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        resp.status(500).send({ error: "Something went wrong" });
    }
});

// Update user by ID (mentor or mentee)
app.put('/update/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const updatedUser = await Mentor.findByIdAndUpdate(id, req.body, { new: true }) || await Mentee.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return resp.status(404).send({ error: "User not found" });
        }
        resp.send(updatedUser);
    } catch (error) {
        console.error(error);
        resp.status(500).send({ error: "Something went wrong" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
