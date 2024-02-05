import { PROPERTY_METADATA } from "../metadata/types"

export function PropertyMapper(constructor: Function) {
    const properties = Object.getOwnPropertyNames(constructor.prototype)
        .filter(property => property !== 'constructor')

    Reflect.defineMetadata(PROPERTY_METADATA, properties, constructor)
}