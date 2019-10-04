const Booking = require('../models/Booking');

module.exports = {
    async store(req, res){
        const { user_id } = req.headers;
        const { spot_id } = req.params; //params qe vem da rota! 
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        //vou popular o relacionamento de spot e de user -> tipo with do laravel
        await booking.populate('spot').populate('user').execPopulate(); 

        return res.json(booking);
    }
};