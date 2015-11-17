ExpenseReceipts = new Mongo.Collection('expense_receipts');
ExpenseReceipts.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc) {
    return true;
  }
});