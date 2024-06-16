import nedb from 'nedb-promises'


const db = nedb.create({ filename: 'menu.db', autoload: true })

// add new menu
async function addMenu(menu, userId) {
    try {

        const newMenu = { ...menu, userId: userId, createdAt:new Date() }
        const insertCampaign = await db.insert(newMenu)
        return insertCampaign

    } catch (error) {
        console.log(error)
        return null
    }
}

// show menu
async function showMenu() {
    try {
        const menus = await db.find({})
        return menus
    } catch (error) {
        console.log(error)
    }
}


// update new menu
async function changeMenuItem(id, updatedMenu) {
    try {
        const menu = await db.findOne({ id: id })
        console.log(menu)

        if (menu) {
            updatedMenu.modifiedAt = new Date();
            const result = await db.update({ id: id }, { $set: updatedMenu }, {})
            return result > 0
        } else {
            return false
        }

    } catch (error) {
        console.log(error)

    }
}


// delete menu item
async function deleteMenuItem(_id) {
    try {
        const deletedMenu = await db.remove({ _id: _id })
        return deletedMenu > 0
    } catch (error) {
        console.log("There was an error when removing menu item:", error)
        return false
    }

}

export { addMenu, showMenu, changeMenuItem, deleteMenuItem }