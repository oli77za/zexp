Template.expense_receipt.onCreated(function () {
    var self = this;
    this.item = {};
    this.autorun(function() {
        self.expense = Expenses.findOne({_id: Template.currentData().expenseId});
        if (self.expense) {
            var itemIndex = Template.currentData().itemIndex;
            self.item = self.expense.items[itemIndex];
        }
    });
});

Template.expense_receipt.helpers({
    imageUploadParams: function() {
        var template = Template.instance();
        return {
            imageId: template.item.imageId,
            imageSavedCallback: function(imageId) {
                var itemIndex = template.data.itemIndex;
                template.item.imageId = imageId;
                Expenses.update(
                    {
                        _id : template.expense._id
                    },
                    { 
                        $set: {
                            'items': template.expense.items
                        }
                    }
                );
            }
        };
    },
    imageId: function() {
        return Template.instance().item.imageId;
    }
});
