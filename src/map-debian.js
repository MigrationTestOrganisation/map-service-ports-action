const shell = require('./shell');
const portsForImage = require('./ports-for-image');
const core = require('@actions/core');

module.exports = async (services) => {
    core.debug('Install necessary tools.');
    await shell(`
        apt-get update
        apt-get install -y socat
    `);

    const keys = Object.keys(services);
    for (const key of keys) {
        core.startGroup(key);

        const service = services[key];
        const port = service.image;

        core.debug('Find service ip');
        const ipAddress = await shell(`getent hosts ${key} | awk '{ print $1 }'`);

        await shell(`socat tcp-l:${port},fork,reuseaddr tcp:${ipAddress}:${port} & disown; exit`);

        core.endGroup();
    }

    core.debug(`Finished`);
}
