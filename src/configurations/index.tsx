interface Secrets {
    apiHost: string;
}

interface Config {
    secrets: Secrets;
}

let cache: Config | null = null;

const environment = import.meta.env.VITE_APP_ENVIRONMENT || "development";

const config = (): Config => {
    if (!cache) {
        cache = Object.freeze({
            secrets: {
                apiHost:
                    environment === "development"
                        ? "https://royal-events-backend.onrender.com"
                        : "https://royal-events-backend.onrender.com",
            },
        });
    }
    return cache;
};

export default config;

//https://royal-events-backend.onrender.com
//http://localhost:3000