const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Creating a new token Schema
const AlertaSchema = new Schema({
    id_token: { type: Schema.Types.ObjectId, ref: 'Token' },
    ip_address: String,
    hostname: String,
    mac_addres: String,
    lat: String,
    lng: String,
    country: String,
    region: String,
    ippublica: String,
    hora_apertura: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});
let Model = mongoose.model('Alarma', AlertaSchema);


module.exports = Model