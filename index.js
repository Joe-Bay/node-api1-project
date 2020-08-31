const express = require('express')
const shortid = require('shortid')

const server = express()

// know this is how it knows to read JSON from req.body
server.use(express.json())

let users = [
    {
        id: 1,
        name: 'Joe Bay',
        bio: 'Likes to eat food, I shouldnt be writing this while hungry',
    },
    {
        id: 2,
        name: 'Miah Davis',
        bio: 'Master at the game warframe',
    },
    {
        id: 3,
        name: 'Juan',
        bio: 'Really is a pretty cool TL',
    },
    {
        id: 4,
        name: 'John Clicken',
        bio: 'Your friendly neighborhood spiderman',
    }
]

server.get('/api/users', (req, res) => { // displaying all the users 
    res.status(200).json({ data: users })
    res.status(500).json({ errorMessage: "the users information could not be retrieved"})
})

server.post('/api/users', (req, res) => { // posts a new user to the array
    const user = req.body
    if(user.name && user.bio){
        users.push(user)
        res.status(201).json({ data: users })
    } else {
        res.status(400).json({ errorMessage: 'Please provide a name and a bio for the user'})
    }

})

server.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    let found = users.find(user => user.id === id)
    if(found) {
        res.status(200).json(found)
    } else {
        res.status(404).json({ message: 'The user with that id does not exist'})
    }
    res.status(500).json({ errorMessage: "The user information could not be retrieved."})
})

server.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    let found = users.find(user => user.id === id)
    const updatedUsers = users.filter(user => user.id !== id)
    if(found){
        res.status(200).json(updatedUsers)
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist"})
    }
    res.status(500).json({ errorMessage: "The user could not be removed"})
})

server.put('/api/users/:id', (req, res) => {
    const changes = req.body
    const id = Number(req.params.id)

    let found = users.find(user => user.id === id)
    if(found) {
        Object.assign(found, changes)
    } else {
        res.status(404).json({ message: 'cannot find the user with the specified ID'})
    }
    
    if(changes.name || changes.bio) {
        res.status(200).json(found)
    } else {
        res.status(400).json({errorMessage: "Please provide name and bio for the user"})
    }
    res.status(500).json({ errorMessage: "The user information could not be modified"})
})
const port = 8000

server.listen(port, () => console.log(`the server is listening on port ${port}`))