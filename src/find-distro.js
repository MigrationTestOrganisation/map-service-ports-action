const getOs = require('getos');

module.exports = () => {
    return new Promise((resolve, reject) => {
        getOs((error, result) => {
            if (error) {
                reject();
            } else {
                resolve(result.dist);
            }
        })
    })
}
