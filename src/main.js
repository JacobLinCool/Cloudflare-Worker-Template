import { Router } from "itty-router";
import { response } from "./response";

const router = Router();

router.all("*", async (request) => {
    const { query } = request;
    return response({ data: JSON.stringify(request, null, query.min ? 0 : 2) });
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
