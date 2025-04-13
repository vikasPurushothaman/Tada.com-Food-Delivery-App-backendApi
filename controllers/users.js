import MenuItem from "../models/MenuItem.js";
import Order from "../models/Order.js";
import Restaurant from "../models/Restaurant.js";
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

export const getRestaurant = async(req, res) => {
  try {
    const restaurantList = await Restaurant.find();
    if(!restaurantList){
      return res.status(400).json({message: 'No restaurants found'});
    }
    res.status(200).json({message: 'Restaurant list retrieved successfully', restaurantList});
  } catch (error) {
    res.status(500).json({ message: 'Restaurant list retrieval failed', error: error.messag}); 
  }
}

export const getTheMEnu = async(req, res) => {
  const {id} = req.query;
  try {
      if (!id) {
          return res.status(400).json({ message: 'Restaurant ID is required' });
      }
      const result = await MenuItem.find({
        restaurant : id
      })
      if(!result){
        return res.status(400).json({message: 'No menu items found'});
      }
      res.status(200).json({message: 'Menu items retrieved successfully', result});
  } catch (error) {
    res.status(500).json({ message: 'Menu items retrieval failed', error: error.messag});
    
  }
}

export const addTheOrder = async (req, res) => {
  const { id, items, address } = req.body;

  try {
    const formatedItems = items.map(item => ({
      menuItem: item._id,
      quantity: parseInt(item.quantity),
    }));

    // Fetch all menu items
    const menuItems = await Promise.all(
      items.map(item => MenuItem.findById(item._id))
    );

    let total = 0;

    menuItems.forEach((menuItem, index) => {
      if (menuItem) {
        const quantity = parseInt(items[index].quantity);
        total += menuItem.price * quantity;
      }
    });

    const newOrder = new Order({
      user: id,
      items: formatedItems,
      deliveryAddress: address,
      total: Math.ceil(total),
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully', newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Order creation failed', error: error.message });
  }
};
