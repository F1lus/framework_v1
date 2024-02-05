import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { ClassLike, PROPERTY_METADATA, RestApiMetadata, RouteMetadata } from "./metadata/types";

export class RouteFactory {

    constructor(private readonly server: FastifyInstance) {}

    createRoute(routerClass: ClassLike) {
        const route = this.getClassMetadata(routerClass, RestApiMetadata.REST_COMPONENT)
        if(!route) {
            return
        }

        const serverPlugin: FastifyPluginAsync = async (plugin, opts) => {
            this.getClassHandlers(routerClass)
                .forEach(
                    handler => this.assignHandler(handler, plugin)
                )
        }

        this.server.register(serverPlugin, { prefix: route })
    }

    private assignHandler(func: Function, plugin: FastifyInstance) {
        const restOptions = this.getFunctionMetadata(func, RestApiMetadata.API_ROUTE)
        if(!restOptions) {
            return
        }

        const { method, route } = restOptions as RouteMetadata
        
        plugin[method](route, func as RouteHandlerMethod)
    }

    private getClassHandlers(routerClass: ClassLike) {
        const properties = this.getClassMetadata(routerClass, PROPERTY_METADATA) as string[]
        return properties
            .map(propKey => Object.create(routerClass)[propKey])
            .filter(prop => prop instanceof Function)
    }

    private getClassMetadata(target: ClassLike, key: any) {
        return Reflect.getMetadata(key, target.constructor)
    }

    private getFunctionMetadata(target: Function, key: any) {
        return Reflect.getMetadata(key, target)
    }
}