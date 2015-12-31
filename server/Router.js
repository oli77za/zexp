
Router.route('/expenses/:id/items/:item_idx/image', function() {
  var expense = Expenses.findOne({ _id: this.params.id, });
  var itemIndex = this.params.item_idx;
  if (expense.items[itemIndex].imageId) {
    var imageObject = ImageUpload.getImageData(expense.items[itemIndex].imageId);
    this.response.statusCode = 200;
    this.response.setHeader('Content-type', 'image/jpeg');
    this.response.end(new Buffer(imageObject),'binary');
  }
}, { where: 'server' });

Router.route('/test', function() {
  var fs = Npm.require("fs");
  var imgData = fs.readFileSync('/Users/oliverzampieri/work/tesco/horizon-ux-prototypes/horizon_4/public/images/aisles/apples.jpg');
  this.response.statusCode = 200;
  this.response.setHeader('Content-type', 'image/jpeg');
  this.response.end(imgData.$binary,'binary');
}, {where: 'server'});
