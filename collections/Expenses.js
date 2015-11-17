Expenses = new Mongo.Collection('expenses');
Expenses.allow({
	insert: function (userId, doc) {
		return true;
	},
	update: function (userId, doc) {
		return true;
	}
});
