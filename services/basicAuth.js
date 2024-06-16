import nedb from 'nedb-promises';
import { nanoid } from 'nanoid';
const dbUser = new nedb({filename: 'users.db', autolaod:true})
const database = new nedb({ filename: 'menu.db', autoload: true });
const campaigndb = new nedb({ filename: 'campaign.db', autoload: true })

// Add new user
async function createUser(user) {
  const newUserId = nanoid(5)
  const newUser = { ...user, userId: newUserId, role: user.role || 'basic' }
  const newInsertedUser = await database.insert(newUser)
  return { newUserId, newInsertedUser }
}

const findUser = async (username) => {
  console.log(username)
  const user = await dbUser.findOne({ username: username })
  console.log(user)
  return user
}

// Add campaign
async function addCampaign(campaign) {
  try {
    const addCampaign_items = await campaigndb.insert(campaign)
    return addCampaign_items
  } catch (error) {
    console.log(error)

  }
}
  // check if all the products exists

  async function checkProducts(productsIds) {
    try {
      const findId = productsIds 
      for (const id of productsIds) {
        const product = await database.findOne({ _id: _id })
      if(!product){
        return res(400).json({message: 'products not found'})
      }
      }
      return res(200).json({message: 'products successfully found'})
    } catch (error) {

      return res(401).json({ message: 'all prouducts not found!' })
    }
  }

export { findUser, createUser, addCampaign,checkProducts }