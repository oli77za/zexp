Template.expense_receipt.onCreated(function () {
  var self = this;
  this.autorun(function() {
    var imageId = ImageUpload.imageId();
    var expense = Expenses.findOne({_id: Template.currentData().expenseId});
    var itemIndex = Template.currentData().itemIndex;
    if (expense && imageId && expense.items[itemIndex].imageId != imageId) {
      var items = expense.items;
      items[Template.currentData().itemIndex].imageId = imageId;
      Expenses.update({_id: expense._id}, {$set: {
	'items': items
      }});
    }
  });
});

Template.expense_receipt.helpers({
  'imageId': function() {
    var expense = Expenses.findOne({_id: Template.currentData().expenseId});
    return expense ? expense.items[Template.currentData().itemIndex].imageId : null;
  }
});
