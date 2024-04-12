const schema = `
	scalar Date

	type User {
		id: ID!
		name: String!
		email: String!
		type: Boolean!
		createdAt: Date!
	}

	type Tour {
		id: ID!
		name: String!
		description: String!
		country: String!
		locations: [String!]!
		images: [String!]!
		cost: Float!
		discount: Float!
		isActive: Boolean!
		createdAt: Date!
	}

	type Booking {
		id: ID!
		user: User
		bookingDate: Date
		tourType: Tour
		quantity: Int!
		totalCost: Float
		attendees: [String!]!
		isPending: Boolean!
		bookingId: String!
		createdAt: Date!
	}

	type Query {
		bookings: [Booking!]!
		booking(id: ID!): Booking
		tours: [Tour!]!
		tour(id: ID!): Tour
	}
`;

module.exports = schema;
