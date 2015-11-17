Router.onBeforeAction(function() {
  if (!Meteor.userId()) {
    Router.go('home');
  }
  this.next();
}, {excpet: 'home'});

Router.route('/', {
  name: "home",
  layoutTemplate: 'AnonymousLayout',
  template: 'Home',
  onBeforeAction: function() {
    if (!!Meteor.userId()) {
      Router.go('my_expenses');
    }
    this.next();
  }
});

Router.route('/my_expenses', {
  name: "my_expenses",
  layoutTemplate: 'MainLayout',
  template: 'Expenses',
  subscriptions : [
  function() {
    this.subscribe('my_expenses');
  }
]
});

Router.route('/expenses', {
  name: "expenses",
  layoutTemplate: 'MainLayout',
  template: 'Expenses',
  subscriptions : [
  function() {
    this.subscribe('expenses');
  }
]
});

Router.route('/expenses/:id', {
  name: "expense_deatils",
  layoutTemplate: 'MainLayout',
  template: 'ExpenseDetails',
  subscriptions : [
  function() {
    this.subscribe('expense', this.params.id);
  }
],
  data: function() {
    return Expenses.find({_id: this.params.id});
  }
});

Router.route('/expenses/:id/items/:item_idx', {
  name: "expense_receipt",
  layoutTemplate: 'MainLayout',
  template: 'expense_receipt',
  subscriptions : [
  function() {
    this.subscribe('expense', this.params.id);
  }
],
  data: function() {
    return {
      expenseId: this.params.id,
      expense: Expenses.findOne({ id: this.params.id, }),
      itemIndex: this.params.item_idx
    };
  }
});

Router.route('/categories', {
  name: 'categories',
  layoutTemplate: 'MainLayout',
  template: 'Categories'
});

Router.route('/users', {
  name: 'users',
  layoutTemplate: 'MainLayout',
  template: 'Users'
});

