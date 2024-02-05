import { FastifyRequest, FastifyReply } from "fastify";

export enum RestApiMetadata {
    REST_COMPONENT = "api:rest_component",
    API_ROUTE = "api:rest_route"
}

export enum RestMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete',
    OPTIONS = 'options'
}

export enum RestMethodLowerCase {
    get = 'GET',
    post = 'POST',
    put = 'PUT',
    patch = 'PATCH',
    delete = 'DELETE',
    options = 'OPTIONS'
}

export const PROPERTY_METADATA = "custom:properties"

export type ClassLike = { new (...args: any[]): any; }

export type RestOptionMethodType = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options'

export type RouteMetadata = { 
    method: RestOptionMethodType, 
    route: string,
    statusCode?: number,
}

export type ApiRequest = FastifyRequest<{ Params: { [key: string]: any }, Reply: {} }>
export type ApiResponse = FastifyReply

export type RouteMetadataExtension = {
    statusCode?: number
}