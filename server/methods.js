Meteor.methods({
  uploadReceipt: function(expenseId, itemIndex, data) {
    ExpenseReceipts.upsert({
      expenseId: expenseId,
      itemIndex: itemIndex
    }, {
      expenseId: expenseId,
      itemIndex: itemIndex,
      data: data
    });
  },
  getExpenses: function(userId) {
    return Expenses,find({
      createdBy: userId
    });
  }
});