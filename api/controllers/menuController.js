const Menu = require("../model/Menu");

const getAllMenuItems=async (req, res) => {
    try {
      const menus = await Menu.find({}).sort({createdAt:-1});
      res.status(200).json(menus);
    } catch {
      res.status(500).json({ message: error.message });
    }
  }

// post a new menu item
const postMenuItem=async(req,res)=>{
  const newItem=req.body;
  try{
    const result=await Menu.create(newItem);
    res.status(200).json(result);

  }
  catch(error){
    res.status(500).json({ message: error.message });

  }
}

// delete a new menu item

const deleteMenuItem = async (req, res) => {
  const menuItemId = req.params.id;
  try {
    const deletedItem = await Menu.findByIdAndDelete(menuItemId);
    if (!deletedItem) {
      return res.status(401).json({ message: "Menu Item not found!" });
    }
    res.status(200).json({ message: "Menu Item Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get single menu item
const singleMenuItem=async(req,res)=>{
  const menuItemId=req.params.id;
  try {
    const menu=await Menu.findById(menuItemId);
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
    
  }
}


// update menu item
const updateMenuItem=async(req,res)=>{
  const menuItemId=req.params.id;
  const {name,recipe,image,category,price}=req.body;
  try {
    const updateMenu=await Menu.findByIdAndUpdate(menuItemId,{name,recipe,image,category,price},{new:true,runValidators:true});
    if(!updateMenu){
      return res.status(401).json({ message: "Menu Item not found!" });

    }
    res.status(200).json(updateMenu);
  } catch (error) {
    res.status(500).json({ message: error.message });
    
  }
}
  module.exports={getAllMenuItems,postMenuItem,deleteMenuItem,singleMenuItem,updateMenuItem}