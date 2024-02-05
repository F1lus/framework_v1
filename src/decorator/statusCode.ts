import { ApiResponse } from "../metadata/types";

const isType = <Type>(thing: any): thing is Type => true;

export function Status(statusCode: number) {
    return function(_: Object, __: string, descriptor: PropertyDescriptor) {
        if(!(descriptor.value instanceof Function)) {
            throw new Error(`Status decorator can only be applied on a Function`)
        }

        const original = descriptor.value

        descriptor.value = function(...args: any[]) {
            if(args.some(isType<ApiResponse>)) {
                const reply = args.find(isType<ApiResponse>) as ApiResponse
                reply.code(statusCode)
            }

            return original.apply(this, args)
        }
    }
}