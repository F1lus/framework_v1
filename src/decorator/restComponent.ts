import { RestApiMetadata } from "../metadata/types";
import { PropertyMapper } from "./propertyMapper";

export function RestComponent(route: string) {
    return function(constructor: Function) {
        PropertyMapper(constructor)
        Reflect.defineMetadata(RestApiMetadata.REST_COMPONENT, route, constructor);
    }
}