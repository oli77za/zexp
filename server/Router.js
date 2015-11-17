
Router.route('/expenses/:id/items/:item_idx/image', function() {
  var expense = Expenses.findOne({ _id: this.params.id, });
  console.log(expense);
  var itemIndex = this.params.item_idx;
  if (expense.items[itemIndex].imageId) {
    var imageObject = ImageUpload.getImageData(expense.items[itemIndex].imageId);
    this.response.statusCode = 200;
    this.response.setHeader('Content-type', 'image/jpeg');
    this.response.end(imageObject);
  }
}, { where: 'server' });

