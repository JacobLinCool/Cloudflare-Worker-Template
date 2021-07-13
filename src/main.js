async function main() {
    addEventListener("fetch", (event) => {
        event.respondWith(handle_request(event));
    });

    addEventListener("scheduled", (event) => {
        event.waitUntil(handle_cron(event));
    });
}

async function handle_request(event) {
    let url = new URL(event.request.url);
    let query = new URLSearchParams(url.search);

    let endpoint = url.pathname.split("/")[1] || "";

    let content = { data: null };

    switch (endpoint) {
        case "query":
            content.data = [...query.entries()];
            break;

        default:
            content.msg = "Unknown.";
            break;
    }

    const response = new Response(JSON.stringify(content, null, query.get("min") ? 0 : 2), {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cross-Origin-Resource-Policy": "cross-origin",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Cache-Control": "max-age=60, s-maxage=60",
        },
    });
    return response;
}

export { main };
