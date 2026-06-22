import User from "../models/User.js"

export const register = async (req, res) => {
 try {

  const {
   name,
   email,
   password
  } = req.body

  const user = await User.create({
   name,
   email,
   password
  })

  res.status(201).json({
   success: true,
   user
  })

 } catch (err) {

  res.status(500).json({
   error: err.message
  })

 }
}