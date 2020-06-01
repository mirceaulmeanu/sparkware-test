import axios from "axios";

export class HttpApi {
    async fetch<T>(url: string) {
        let response = await axios.get<T>(url).then(response => response.data);

        // Filosofical question. What does 404 means?
        // "Not found" because of a bogus of malformed url any problem that prevented the request of finding the endpoint (dns problem)
        // or that the request went through but the resource was not found on the server ?
        // if (response.status !== 200) {
        //     if (response.status === 404) {
        //         throw new NotFoundError(`Got response with status code 404`);
        //     }
        //     throw new Error(`Got response with unexpected status ${response.status}`);
        // }

        return response;
    }
}
