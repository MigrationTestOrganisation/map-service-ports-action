const shell = require('./shell');
const portsForImage = require('./ports-for-image');
const core = require('@actions/core');

module.exports = async (services) => {
    core.info('Install necessary tools.');
    await shell(`
        apk add --no-cache socat
    `);

    const keys = Object.keys(services);
    for (const key of keys) {
        core.startGroup(key);

        const service = services[key];
        const port = service.image;

        core.info('Find service ip');
        const ipAddress = await shell(`getent hosts ${key} | awk '{ print $1 }'`);
        core.info(`Using ip ${ipAddress}`);

        await shell(`nohup socat tcp-l:${port},fork,reuseaddr tcp:${ipAddress}:${port} &`);

        core.info(`Finished`);
        core.endGroup();
    }

    core.debug(`Finished`);
}

