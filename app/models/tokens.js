const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Creating a new token Schema
const TokenSchema = new Schema({
  propietario:  { type: Schema.Types.ObjectId, ref: 'User'},
  nombre_token: String, 
  nota_recordatoria: String,
  disponible: { type: Boolean, default: true },//porque los tokens tienen un vencimiento de 7 dias o un mes, explicar al equipo
  fecha_creacion: { type: Date, default: Date.now }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});
let Model =  mongoose.model('Token', TokenSchema);


module.exports = Model