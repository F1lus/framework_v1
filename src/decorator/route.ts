import { defineRouteMetadata, routeMethod } from "../metadata/metadataHandler"
import { RestMethod, RouteMetadata } from "../metadata/types"

export function RouteDefinition(options: RouteMetadata) {
    const method = routeMethod.toUpper(options.method)
    const route = options.route

    return function(_: Object, __: string, descriptor: PropertyDescriptor) {
        if(!(descriptor.value instanceof Function)) {
            throw new Error(`${method} decorator can only be applied on a Function`)
        }

        defineRouteMetadata(
            { 
                method: RestMethod[method],
                route
            }, 
            descriptor.value
        )
    }
}

export function GET(route: string) {
    return RouteDefinition({ method: 'get', route })
}

export function POST(route: string) {
    return RouteDefinition({ method: 'post', route })
}

export function PUT(route: string) {
    return RouteDefinition({ method: 'put', route })
}

export function PATCH(route: string) {
    return RouteDefinition({ method: 'patch', route })
}

export function DELETE(route: string) {
    return RouteDefinition({ method: 'delete', route })
}

export function OPTIONS(route: string) {
    return RouteDefinition({ method: 'options', route })
}