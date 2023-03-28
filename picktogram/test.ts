import * as Apis from "picktogram-server-apis/api/functional";

const fetcher = async () => {
    try {
        const response = await Apis.api.v1.auth
        .login(
            {
                host: "http://13.209.193.45:3000",
            },
            {
                email: "user@example.com",
                password: "string",
            }
        );

        return response.data
    } catch (err) {
        throw err
    }
}
