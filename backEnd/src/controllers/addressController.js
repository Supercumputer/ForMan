const Address = require("../models/address");

const createAddress = async (req, res) => {
    try {
        const { user_id, name, phone, email, address, isDefault } = req.body;

        if(!user_id || !name || !phone || !email || !address) {
            return res.status(400).json({status: false, message: "Please fill in all fields" });
        }

        const defaultAddress = await Address.findOne({ user_id, isDefault: true });
  
        await Address.create({
            user_id,
            name,
            phone,
            email,
            address,
            isDefault: !defaultAddress
        });

        return res.status(201).json({ status: true, message: "Address created successfully" });
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        
        const { name, phone, email, address } = req.body;

        const existingAddress = await Address.findById(id);

        if (!existingAddress) {
            return res.status(404).json({ message: "Address not found" });
        }

        await Address.findByIdAndUpdate(id, {
            name,
            phone,
            email,
            address,
            
        }, { new: true });

        return res.status(200).json({status: true, message: "Address updated successfully"});

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;

        const existingAddress = await Address.findById(id);

        if (!existingAddress) {
            return res.status(404).json({ message: "Address not found" });
        }

        if (existingAddress.isDefault) {
        
            const newDefaultAddress = await Address.findOne({ user_id: existingAddress.user_id, isDefault: false });

            if (newDefaultAddress) {
                await Address.findByIdAndUpdate(newDefaultAddress._id, { isDefault: true });
            }
        }

        await Address.findByIdAndDelete(id);
        
        return res.status(200).json({status: true, message: "Address deleted successfully"});

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const updateDefaultAddress = async (req, res) => {
    try {
        const { id } = req.params;

        const existingAddress = await Address.findById(id);

        if (!existingAddress) {
            return res.status(404).json({ message: "Address not found" });
        }

        await Address.findOneAndUpdate({ user_id: existingAddress.user_id, isDefault: true }, { isDefault: false });
        
        existingAddress.isDefault = true;

        await existingAddress.save();
        
        return res.status(200).json({status: true, message: "Update default successfully"});

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAddresses = async (req, res) => {
    try {
        const user_id = req.params.id;
        const addresses = await Address.find({ user_id }).sort({ isDefault: -1});

        return res.status(200).json({status: true, addresses});

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const getAddressDefault = async (req, res) => {
    try {
        const user_id = req.params.id;

        const address = await Address.findOne({ user_id, isDefault: true });

        return res.status(200).json({status: true, address});

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAddress,
    updateAddress,
    deleteAddress,
    getAddresses,
    updateDefaultAddress,
    getAddressDefault
}