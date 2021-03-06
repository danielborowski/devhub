const fs = require('fs').promises;
const path = require('path');
const { ASSETS_COLLECTION } = require('../../build-constants');
const { getMetadata } = require('../get-metadata');

const metadata = getMetadata();
const DB = metadata.database;

const saveAssetFile = async asset => {
    await fs.mkdir(path.join('static', path.dirname(asset.filename)), {
        recursive: true,
    });
    await fs.writeFile(
        path.join('static', asset.filename),
        asset.data.buffer,
        'binary'
    );
};

// Write all assets to static directory
const saveAssetFiles = async (assets, stitchClient) => {
    const promises = [];
    const assetQuery = { _id: { $in: assets } };
    const assetDataDocuments = await stitchClient.callFunction(
        'fetchDocuments',
        [DB, ASSETS_COLLECTION, assetQuery]
    );
    assetDataDocuments.forEach(asset => {
        promises.push(saveAssetFile(asset));
    });
    return Promise.all(promises);
};

module.exports = { saveAssetFiles };
