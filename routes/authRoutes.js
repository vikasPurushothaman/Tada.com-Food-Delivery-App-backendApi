import express from 'express';
import { Login, signup } from '../controllers/authController.js'; 
import { verifyToken } from '../middleware/authMiddleware.js';
import { getProfile, updateProfile } from '../controllers/users.js';
import { addMEnu, createRestaurant, deleteTheMenu, editMenu } from '../controllers/restaurant.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', Login); 
router.post('/editUser', updateProfile)
router.get('/getUser', getProfile)

// restaurant 

router.post('/create/restaurant', createRestaurant)
router.post('/create/Menu', addMEnu)
router.post('/update/Menu', editMenu)
router.delete('/delete/Menu', deleteTheMenu)



export default router;

