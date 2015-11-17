Meteor.publish('expenses', function() {
  return Expenses.find({}, {
    $sort: 1
  });
});

Meteor.publish('my_expenses', function() {
  return Expenses.find({
    createdBy: this.userId
  });
});

Meteor.publish('expense', function(id) {
  return Expenses.find({
    _id: id
  });
});

Meteor.publish('all_users', function() {
  return Meteor.users.find({});
});

Meteor.publish('categories', function() {
  return Categories.find({});
});
