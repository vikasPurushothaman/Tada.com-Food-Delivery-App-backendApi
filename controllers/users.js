import User from "../models/User.js";
import bcrypt from 'bcrypt';


export const updateProfile = async (req, res) => {
  const { name, email, phone, address, id, newPassword, password } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ message: 'User not found' });
    if (password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid current password' });
      }

      if (newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
      }
    }
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      user.email = email;
    }
    if (phone && phone !== user.phone) {
      const phoneExists = await User.findOne({ phone });
      if (phoneExists) {
        return res.status(400).json({ message: 'Phone number already exists' });
      }
      user.phone = phone;
    }
    if (name) user.name = name;
    if (address) user.address = address;
    await user.save();
    res.status(200).json({ message: 'Profile updated successfully', user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        id : user._id
    } });

  } catch (error) {
    res.status(500).json({ message: 'Profile update failed', error: error.message });
  }
};


export const getProfile = async (req, res) => {
    const {id} = req.query;
    try {
            if(!id){
                return res.status(400).json({message: 'User ID is required'});
            }
            const user = await User.findById(id).select('-password')
            if(!user){
                return res.status(400).json({message: 'User not found'});
            }
            res.status(200).json({message: 'Profile retrieved successfully', user});
    } catch (error) {
        res.status(500).json({ message: 'Profile retrieval failed', error: error.message });
    }
}