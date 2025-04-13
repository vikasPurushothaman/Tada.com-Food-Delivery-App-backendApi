import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signup = async (req, res) => {
  const { name, email, phone, password, address } = req.body;

  try {
    const checkExistingUser = await User.findOne({ email });
    if (checkExistingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );

    res.status(200).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
};

export const Login = async (req, res) => {
    const { email, password } = req.body;
    try{
        const CheckUser = await User.findOne({
            email
        })
        if(!CheckUser) return res.status(400).json({message: 'Email not found'})
            const isvalidePassword = await bcrypt.compare(password, CheckUser.password)
        if (!isvalidePassword) {
            return res.status(400).json({ message: 'Invalid password' });
          }
          const token = jwt.sign(
            { userId: CheckUser._id }, process.env.SECRET_KEY,
            { expiresIn: '1d' }
          );
          res.status(200).json({ user: CheckUser, token }); 
    }
    catch{
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
}


