const executeCommand = require('child_process').exec;

module.exports = async function shell(cmd) {
    return await new Promise((resolve, reject) => {
        executeCommand(cmd, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }

            resolve(stdout.trim());
        });
    });
}
