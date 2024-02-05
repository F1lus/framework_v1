import "reflect-metadata"

import fastify from "fastify";
import helmet from "@fastify/helmet"
import cors from "@fastify/cors"
import { config } from "dotenv";

import { LOGGER } from "./src/util/logger";
import { SourceMapper } from "./src/SourceMapper";
import { RouteFactory } from "./src/RouteFactory";

config()

const server = fastify()

server.register(helmet)
server.register(cors)

server.setErrorHandler((error, request, reply) => {
  reply.code(500).send("Internal Server Error")
})

server.addHook("onSend", async (req, res, payload) => {
  if(!payload) {
    res.type('application/json; charset=utf-8').code(404)
    return JSON.stringify({})
  }
  return payload
})

SourceMapper.classMapping()
  .subscribe(instance => {
    const t = new RouteFactory(server)
    t.createRoute(instance)
  })

server.listen({ port: 3000 }, (err, address) => {
    if (err) {
        LOGGER.error(err)
        process.exit(1)
      }
    LOGGER.success(`Server listening at ${address}`)
})