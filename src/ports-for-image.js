module.exports = (image) => {
    const type = image.split(':')[0];

    switch (type) {
        case 'mysql':
            return [3306];
        default:
            throw new Error(`Unable to find ports for type ${type}`);
    }
}
