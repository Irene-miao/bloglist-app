const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// Create new user
usersRouter.post('/', async (request, response) => {
    const body = request.body
console.log(body)
if (!body.password) {
    return response.status(400).json({ error: "Missing password" })
} else if (body.password.length < 3) {
    return response.status(400).json({ error: "Password must be at least 3 characters long" })
}
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
 
 
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

// Get all users
usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, url: 1, likes: 1 })
    response.json(users)
})

//Get one
usersRouter.get("/:id", async (request, response) => {
    const user = await User.findById(request.params.id)
    response.json(user)
  })


// Delete a user
usersRouter.delete( "/:id",async (request, response) => {
    
    const user = await User.findById(request.params.id);

    if (user.id.toString() === user._id.toString()) {
      await user.remove()
      response.status(204).end();
    } else {
      return response
        .status(401)
        .json({ error: "Only the creator can delete user" });
    }
  }
);

module.exports = usersRouter