const { GraphQLScalarType, Kind } = require("graphql");
const Booking = require("../schemas/BookingSchema");
const Tour = require("../schemas/TourSchema");

const resolvers = {
	Date: new GraphQLScalarType({
		name: "Date",
		description: "Date custom scalar type",
		parseValue(value) {
			return new Date(value); // value from the client
		},
		serialize(value) {
			return value.getTime(); // value sent to the client
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.INT) {
				return parseInt(ast.value, 10); // ast value is always in string format
			}
			return null;
		},
	}),
	Query: {
		bookings: async () => {
			const bookings = await Booking.find().populate("user tourType");
			return bookings;
		},
		booking: async (_, { id }) => {
			const booking = await Booking.findById(id).populate("user tourType");
			return booking;
		},
		tours: async () => {
			const tours = await Tour.find().exec();
			return tours;
		},
		tour: async (_, { id }) => {
			const tour = await Tour.findById(id).exec();
			return tour;
		},
	},
};

module.exports = resolvers;
