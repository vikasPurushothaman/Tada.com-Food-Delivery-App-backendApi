import MenuItem from "../models/MenuItem.js";
import Restaurant from "../models/Restaurant.js";
import bcrypt from 'bcrypt';

export const createRestaurant = async (req, res) => {
    const { name, location, phone, email, password, image, id } = req.body;
    try {
            if (
                !name && !location && !phone && !email && !password && !image
            ) {
                return res.status(400).json({ message: "Please fill all fields" });
            }
            if (!id) {
                return res.status(400).json({ message: "Please fill id" });
            }
            const hashpassword = await bcrypt.hash(password, 10);
            const restaurant = await Restaurant.create({
                name,
                location,
                phone,
                email,
                password: hashpassword,
                image,
                createdBy : id,
                owner: id

            });
            await restaurant.save();
            res.status(201).json({ message: "Restaurant created successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error creating restaurant" });
    }
}

export const addMEnu = async (req, res) => {
    const { name, price, description, image, restaurantId, id } = req.body;
    try {
        if (!name && !price && !description && !image && !restaurantId && !id) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
       
        
        const Menu = await MenuItem.create({
            name,
            price,
            description,
            image,
            restaurant: restaurantId,
            createdBy: id,
            owner: id
        });

        await Restaurant.findByIdAndUpdate(
            restaurantId,
            {
                $push: {
                    menu: Menu._id
                }
            }
        );

        res.status(201).json({ message: "Menu item created successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Error creating menu item" });
    }
};

export const editMenu = async (req, res) => {
    const { id, name, price, description, image } = req.body;

    try {
        if (!id) return res.status(400).json({ message: "Menu ID is required" });

        const updatedMenu = await MenuItem.findByIdAndUpdate(
            id,
            {
                name,
                price,
                description,
                image
            },
            { new: true } // This returns the updated document
        );

        if (!updatedMenu) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        res.status(200).json({
            message: "Menu item updated successfully",
            data: updatedMenu
        });

    } catch (error) {
        res.status(500).json({ message: "Error updating menu item", error: error.message });
    }
};

export const deleteTheMenu = async (req, res) => {
    const { id } = req.query;
    try {
        const deleteMenu = await MenuItem.findByIdAndDelete(id);
        if (!deleteMenu) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        const deleteFromRestaurant = await Restaurant.updateMany(
            { menu: id },
            { $pull: { menu: id } }
        );
        if (deleteFromRestaurant.nModified === 0) {
            console.log('No restaurant menu was updated.');
        }
        res.status(200).json({ message: "Menu item deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting menu item", error: error.message });
    }
};
