var mongoose = require('mongoose');
var bCrypt   = require('bcrypt-nodejs');
var Schema   = mongoose.Schema;

var userSchema = new mongoose.Schema({
  name:         {type: String, uppercase: true, required: true},
  dadLastName:  {type: String, uppercase: true, required: true},
  momLastName:  {type: String, uppercase: true, required: true},
  birthday:     {type: Date, default:Date.now},
  email:        String,
  password:     {type: String, required: true},
  accType:      {type: String,
                  enum : [
                    'member','default','admin','doctor',
                    'recepcionist', 'capturist',
                    'memberAgent','doctorAgent'],
                  default:'member',
                  required: true},
  cp:           {type: String, required: true},
  gender:       {type: String,
                  enum : ['Masculino','Femenino'],
                  default : 'Masculino'},
  cellphone:     {type: String},
  //membership:   {type: Schema.Types.ObjectId, ref: 'Membership'}
  membership : {
    memberId :  {type: String},
    startDate : {type: Date, default: Date.now, required: true },
    expiringDate: {type: Date, require: true},
    type :      {type: String,
                  enum: ['A','B','C'], default: 'A'},
  }
}, { runSettersOnQuery: true });

//Generar el hashSync
userSchema.methods.generateHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password){
  return bCrypt.compareSync(password, this.password);
};

userSchema.methods.getAccTypes = function(){
  return userSchema.path('accType').enumValues;
};

module.exports = mongoose.model('User', userSchema);
