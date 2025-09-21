const Sweets = require('../models/sweets');

exports.purchaseSweet = async(req, res) => {
    try{
        const {quantity} = req.body;
        const {id} = req.params;
        if(!quantity || quantity === 0){
            return res.status(401).json({
                success: false,
                message: "A valid quantity is required"
            })
        }
        const sweet = await Sweets.findOne({sweetId: id});
        if(!sweet){
            return res.status(401).json({
                success: false,
                message: "No sweet with this Id"
            })
        }
        if(sweet.quantity < quantity){
            return res.status(401).json({
                success: false,
                message: "This much stock is not available"
            })
        }
        await Sweets.findOneAndUpdate({
            sweetId: id
        }, {
            quantity : sweet.quantity - quantity
        })
        return res.status(200).json({
            success: true,
            message: "Purchase Successfull"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

exports.restockSweet = async(req, res) => {
    try{
        const {id} = req.params;
        const {quantity} = req.body;
        if(!id || !quantity){
            return res.status(401).json({
                success: false,
                message: "Id and quantity are required"
            })
        }
        const sweet = await Sweets.findById({id: id});
        if(!sweet){
            return res.status(401).json({
                success: false,
                message: "No sweet with this Id"
            })
        }
        await Sweets.findByIdAndUpdate({id: id}, {
            quantity: sweet.quantity + quantity
        })
        return res.status(200).json({
            success: true,
            message: "Restock Successfull"
        }) 
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}