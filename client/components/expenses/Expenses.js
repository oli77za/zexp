Template.Expenses.onCreated(function () {
  var self = this;
//  self.autorun(function () {
 //   self.subscribe('my_expenses');
  //});
});

Template.Expenses.helpers({
  expenses: function () {
    return Expenses.find();
  }
});

Template.Expenses.events({
  'click .add_button .button' : function() {
    Expenses.insert({
      name: 'new expense',
      description: '',
      createdBy: Meteor.userId(),
      createdAt: new Date()
    });
  }
});

Template.ExpenseCard.helpers({
  formattedDate: function () {
    return this.createdAt.toLocaleDateString();
  },
  state: function() {
    if (!this.submittedOn) {
      return 'draft';
    } else if (!this.approvedBy) {
      return 'submitted';
    } else if (!this.processedBy) {
      return 'approved';
    } else {
      return 'processed';
    }
  }
});

Template.ExpenseCard.events({
  'click': function() {
    Router.go('expense_deatils', {
      id: this._id
    });
  }
});
