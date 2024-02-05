import { 
    RestApiMetadata, RestMethodLowerCase, RestOptionMethodType, 
    RouteMetadata, RouteMetadataExtension 
} from "./types";

export const routeMethod = {
    toUpper: (method: RestOptionMethodType) => RestMethodLowerCase[method]
}

export function defineRouteMetadata(metadata: RouteMetadata, target: Function) {
    Reflect.defineMetadata(RestApiMetadata.API_ROUTE, metadata, target)
}

export function extendRouteMetadata(metadata: RouteMetadataExtension, target: Function) {
    if(!Reflect.hasMetadata(RestApiMetadata.API_ROUTE, target)) {
        throw new Error('Route metadata does not exists, so it cannot be extented.')
    }

    const predefinedMetadata: RouteMetadata = Reflect.getMetadata(RestApiMetadata.API_ROUTE, target)

    Reflect.defineMetadata(
        RestApiMetadata.API_ROUTE,
        {
            ...predefinedMetadata,
            ...metadata
        },
        target
    )
}