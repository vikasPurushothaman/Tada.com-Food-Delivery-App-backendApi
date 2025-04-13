import express from 'express';
import { Login, signup } from '../controllers/authController.js'; 
import { verifyToken } from '../middleware/authMiddleware.js';
import { getProfile, getRestaurant, getTheMEnu, updateProfile } from '../controllers/users.js';
import { addMEnu, createRestaurant, deleteTheMenu, editMenu } from '../controllers/restaurant.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', Login); 
router.post('/editUser', updateProfile)
router.get('/getUser', getProfile)

// restaurant 

router.post('/create/restaurant',verifyToken, createRestaurant)
router.post('/create/Menu',verifyToken, addMEnu)
router.post('/update/Menu',verifyToken, editMenu)
router.delete('/delete/Menu',verifyToken, deleteTheMenu)

// order 

// get the restaurent list
router.get('/App/restaurent', getRestaurant)
// get the menu list
router.get('/App/menu', getTheMEnu)
// get the order list

//  

export default router;

