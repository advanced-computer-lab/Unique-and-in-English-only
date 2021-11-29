const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    FlightNumber: {
        type: String,
        required: true
    },
    DepartureTime: {
        type: Date,
        required: true
    },
    ArrivalTime: {
        type: Date,
        required: true
    },
    EconomySeatsNumber: {
        type: Number,
        required: true
    },
    BuisnessSeatsNumber: {
        type: Number,
        required: true
    },
    DeparturePort: {
        type: String,
        required: true
    },
    ArrivalPort: {
        type: String,
        required: true
    },
    ArrivalTerminal: {
        type: String
    },
    DepartureTerminal: {
        type: String
    },
    BuisnessSeats: {
        type: Array
    },
    EconomySeats: {
        type: Array
    }

});




const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;