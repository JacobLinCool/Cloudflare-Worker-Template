import { Router } from "itty-router";
import { response } from "./response";

const router = Router();

router.all("/body*", async (request) => {
    const { query, headers } = request;
    let body;
    if (headers.get("Content-Type") === "application/json") body = await request.json();
    else if (headers.get("Content-Type") === "application/x-www-form-urlencoded") body = decodeURIComponent(await request.text());
    else body = await request.text();
    return response({ data: JSON.stringify({ body }, null, query.min ? 0 : 2) });
});

router.all("/query*", async (request) => {
    const { query } = request;
    return response({ data: JSON.stringify({ query: request.query }, null, query.min ? 0 : 2) });
});

router.all("/cf*", async (request) => {
    const { query } = request;
    return response({ data: JSON.stringify({ cf: request.cf }, null, query.min ? 0 : 2) });
});

router.all("/header*", async (request) => {
    const { query, headers } = request;
    const parsed_headers = [...headers.entries()].reduce((a, b) => {
        a[b[0]] = b[1];
        return a;
    }, {});
    return response({ data: JSON.stringify({ headers: parsed_headers }, null, query.min ? 0 : 2) });
});

router.all("*", async (request) => {
    const { query, headers } = request;
    const parsed_headers = [...headers.entries()].reduce((a, b) => {
        a[b[0]] = b[1];
        return a;
    }, {});
    return response({ data: JSON.stringify({ ...request, headers: parsed_headers }, null, query.min ? 0 : 2) });
});

async function main() {
    addEventListener("fetch", (event) => {
        event.respondWith(router.handle(event.request));
    });

    addEventListener("scheduled", (event) => {
        event.waitUntil(handle_cron(event));
    });
}

export { main };
