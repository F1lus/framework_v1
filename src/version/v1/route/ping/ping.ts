import { GET } from "../../../../decorator/route";
import { RestComponent } from "../../../../decorator/restComponent";
import { ApiRequest } from "../../../../metadata/types";
import { Status } from "../../../../decorator/statusCode";

@RestComponent("/ping")
export class PingRoutes {

    @GET("/")
    async getPing() {
        return { ping: "pong" }
    }

    @GET('/:id')
    @Status(500)
    async getById(request: ApiRequest) {
        return request.params['id1']
    }

}
