import { Router } from 'express';
import { addMenu, showMenu, changeMenuItem, deleteMenuItem } from '../services/menu.js'
import { checkLoggedIn, checkRole } from '../middlewares/basicAuth.js'
import validateMenu from '../middlewares/validateMenu.js';
import validateCamp from '../middlewares/validateCamp.js';
import { addCampaign,checkProducts } from '../services/basicAuth.js';
const router = Router()

// get menu
router.get('/', async (req, res) => {

    const menu = await showMenu()

    res.json({ showmenu: menu })
})

// add new menu item
router.post('/add',validateMenu,checkLoggedIn,checkRole('admin'),async (req, res) => {
   try{
     const menu = req.body
    
     const result = await addMenu(menu);

    if (result) {
        res.status(201).json({ message: "Menu item added successfully", menu: result })
    } else {
        res.status(500).json({ message: "Failed to add menu item" })
    }
   } catch(error) {
    res.status(500).json({ message: "Internal server error", error })
}
  
})
// add campaign
router.post('/campaign',checkLoggedIn,checkRole('admin'),async (req, res)=>{

    try{
       const {productIds, campaignPrice} = req.body

       const validProducts = await checkProducts(productIds)
       
       if(!validProducts){
       return res.status(400).json({message: 'one or more products dont exists'})
       }
       const campaign = {productIds, campaignPrice, createdAt: new Date()}
        const result = await addCampaign(campaign);
        console.log(campaign)
       if (result) {
           res.status(201).json({ message: "Menu item added successfully", menu: result })
       } else {
           res.status(500).json({ message: "Failed to add menu item" })
       }
      } catch(error) {
       res.status(500).json({ message: "Internal server error", error })
   }

})



// change menu item

router.put('/change/:id',checkLoggedIn,checkRole('admin'), async (req, res) => {
    try {
        const updatedMenu = req.body
        const menuId = parseInt(req.params.id, 10)
        const result = await changeMenuItem(menuId, updatedMenu)

        if (result) {
            res.json({ message: "menu changed successfully" })
        } else {
            res.status(401).json({ message: "menu item was not found" })
        }
    } catch (error) {
        res.status(500).json({ mesage: "An error was found when updating the menu" })
    }

})
// delete menu item

router.delete('/delete/:_id',checkLoggedIn,checkRole('admin'),async (req, res) => {
    
    try{
     const _id  = req.params._id
     
     const result = await deleteMenuItem(_id)
      
       if(result){
        res.json({message: "Menu item deleted successfully"})
     } else{
        req.status(401).json({message: "user not found"})
     }
    
    } catch(error) {
         res.status(500).json({ message: "Internal server error"})
    }
    
    
})
export default router

