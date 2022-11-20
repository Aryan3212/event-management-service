import logger from "pino";

let isEnabled = true;
if (process.env.NODE_ENV === 'test') {
    isEnabled = false;
}

const log = logger({
    enabled: isEnabled,
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${Date.now()}"`,
});

export default log;