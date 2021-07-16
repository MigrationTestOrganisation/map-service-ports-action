const core = require('@actions/core');
const github = require('@actions/github');
const os = require('os');
const findDistro = require('./find-distro');
const mapDebian = require('./map-debian');
const mapAlpine = require('./map-alpine');

const run = async () => {
    const platform = os.platform();

    if (platform !== 'linux') {
        throw new Error('Action only available on Linux at this moment.');
    }

    core.debug(`Detected platform ${platform}`);

    const distro = await findDistro();
    core.debug(`Found distribution ${distro}`);

    const input = JSON.parse(core.getInput('services_json'));

    switch (distro) {
        case 'Debian':
            await mapDebian(input);
            return;
        case 'Alpine':
            await mapAlpine(input);
            return;
        default:
            throw new Error(`Unsupported distribution ${distro}`);
    }
}

run()
    .catch(error => core.setFailed(error.toString()))
