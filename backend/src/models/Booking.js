const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean, //começa nulo
    user: { //user_id
        type: mongoose.Schema.Types.ObjectId, //objectId é o id que ele coloca automaticamente nos bancos
        ref: 'User' //ref: referencia pra qual model é essa info, a de user se refere ao model user
    },
    spot: { //spot_id
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Spot' 
    }
});

module.exports = mongoose.model('Booking', BookingSchema);