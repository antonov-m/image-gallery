const jsonServer = require('json-server')
const faker = require('faker')

const createImageObj = id => ({
    id,
    url: faker.image.cats(),
    author: {
        name: `${faker.name.findName()} ${faker.name.lastName()}`
    },
    camera: {
        model: faker.vehicle.model()
    },
    hashtags: [...Array(5).keys()].map(() => faker.commerce.productName())
})

const data = {
    images: [...Array(45).keys()].map(createImageObj)
}

const server = jsonServer.create()
const router = jsonServer.router(data)
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(jsonServer.bodyParser)

server.post('/auth', function (req, res, next) {
  console.log(req.body)
  res.json({ token: 'ce09287c97bf310284be3c97619158cfed026004' })
})

server.use(router)
server.listen(3000, function () {
  console.log('JSON Server is running')
})
