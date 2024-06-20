const expressAsyncHandler = require('express-async-handler');
const Carrier = require('../models/carrierModel');
const fs = require('fs');
const path = require('path');
const { processMongoDBObject:format} = require('./formatter')


function base64DecodeFile(base64String) {
  return Buffer.from(base64String, 'base64');
}



const uploadeFile = expressAsyncHandler(async (req, res) => {
  const carrier_id = req.user_id
  if (!req.body.data) {
    return res.status(400).json({ 'error': 'No files were uploaded.' });
  }
  if (!req.body.extension) {
    return res.status(400).json({ 'error': 'No extension in request body' });
  }
  if (!req.body.type) {
    return res.status(400).json({'error': 'No type in request body'});
  }
  const type = req.body.type
  if (type !== "license" && type !== "idcard") {
    return res.status(400).json({'error': 'The type shoulf be license or idcard'})
  }
  let filename = '';
  if (type == "license") {
    filename = `license_${carrier_id}.${req.body.extension}`;
  } else {
    filename = `idcard_${carrier_id}.${req.body.extension}`;
  }
  const uploadedirect = 'uploads';
  const uploadedFilePath = path.join(uploadedirect, filename);

  if (!fs.existsSync(uploadedirect)) {
    fs.mkdirSync(uploadedirect, { recursive: true });
  }

  const buffer = base64DecodeFile(req.body.data);
  fs.writeFileSync(uploadedFilePath, buffer);
  const pat = `${req.get('host')}/${filename}`;
  const result = {"status": "success", "path": pat};

  return res.status(200).json(result);

});

module.exports = {uploadeFile};