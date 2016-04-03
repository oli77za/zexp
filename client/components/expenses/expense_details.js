Template.ExpenseDetails.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('categories');
  });
});

Template.ExpenseDetails.helpers({
  categories: function() {
    return Categories.find();
  },
  expense: function() {
    return Expenses.findOne(Router.current().params.id);
  },
  formatDate: function(value) {
    return value ? value.toISOString().substring(0, 10) : '';
  },
  isSet: function(propertyName) {
    var expense = Expenses.findOne(Router.current().params.id);
    return expense && expense[propertyName] !== undefined;
  },
  totalValues: function() {
    var totalValues = {
      amount: 0,
  vat: 0
    };
    var expense = Expenses.findOne(Router.current().params.id);
    if (!expense) {
      return totalValues;
    }
    _.each(expense.items, function(element, index, list) {
      if (element.amount) {
        totalValues.amount += element.amount;
        totalValues.vat += element.amount * element.vatRate / 100;
      }
    });
    return totalValues;
  },
  getUserName: function(userId) {
    var user = Meteor.users.findOne({
      _id: userId
    });
    return user ? user.profile.name : 'unknown';
  },
  isSubmitted: function() {
    var expense = Expenses.findOne(Router.current().params.id);
    return expense && expense.submittedOn !== undefined;
  },
  isApproved: function() {
    var expense = Expenses.findOne(Router.current().params.id);
    return expense && expense.approvedBy !== undefined;
  },
  isProcessed: function() {
    var expense = Expenses.findOne(Router.current().params.id);
    return expense && expense.processedBy !== undefined;
  },
  disableNoReceipt: function(item) {
    return item.receiptId === undefined ? 'disabled' : '';
  }
});

Template.ExpenseDetails.events({
  'change input[name="name"]': function() {
    Expenses.update({
      _id: Router.current().params.id
    }, {
      $set: {
        name: $('input[name="name"]').val(),
      description: $('textarea[name="description"]').val(),
      }
    });
  },
  'change select[name="category"]': function(event) {
    var category = Categories.findOne({code: $('select[name="category"]').val()});
    if (category !== null) {
      $('input[name="vat_rate"]').val(category.vat);
    }
  },
  'click .expense_item .remove_button': function(event) {
    var expense = Expenses.findOne(Router.current().params.id);
    ImageUpload.removeImage(expense.items[event.currentTarget.dataset.index].imageId);
    expense.items.splice(event.currentTarget.dataset.index, 1);
    Expenses.update({
      _id: Router.current().params.id
    }, {
      $set: {
        items: expense.items,
      }
    });
  },
  'click .add_item': function(event, template) {
    var expense = Expenses.findOne(Router.current().params.id);
    var itemDate = $(event.currentTarget).parent().find('input[name="date"]').val();
    var date = itemDate !== '' ? new Date(itemDate) : null;
    if (expense.items === undefined) {
      expense.items = [];
    }
    expense.items.push({
      'date': date,
      'item': $(event.currentTarget).parent().find('input[name="item"]').val(),
      'amount': Number.parseFloat($(event.currentTarget).parent().find('input[name="amount"]').val()),
      'vatRate': Number.parseFloat($(event.currentTarget).parent().find('input[name="vat_rate"]').val()),
      categoryCode : $('select[name="category"]').val(),
      categoryName : $('select[name="category"] option:selected').text()
    });
    Expenses.update({
      _id: Router.current().params.id
    }, {
      $set: {
        items: expense.items,
      }
    });
  },
  'click .submit_button': function() {
    Expenses.update({
      _id: Router.current().params.id
    }, {
      $set: {
        submittedOn: new Date()
      }
    });
  },
  'click .approve_button': function() {
    Expenses.update({
      _id: Router.current().params.id
    }, {
      $set: {
        approvedBy: Meteor.userId(),
    approvedOn: new Date()
      }
    });
  },
  'click .reject_button': function() {
    Expenses.update({
      _id: Router.current().params.id
    }, {
      $unset: {
        submittedOn: ""
      }
    });
  },
  'click .process_button': function() {
    Expenses.update({
      _id: Router.current().params.id
    }, {
      $set: {
        processedBy: Meteor.userId(),
    processedOn: new Date(),
    processReference: $('input[name="process_reference"]').val()
      }
    });
  }
});
