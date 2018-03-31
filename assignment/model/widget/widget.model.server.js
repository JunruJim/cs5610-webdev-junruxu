var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var widgetModel = mongoose.model('widgetModel', widgetSchema);

var pageModel = require("../page/page.model.server");

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function reorderWidget(pageId, start, end) {
  return pageModel.findPageById(pageId)
    .then(function(page) {
      const widgetToModify = page.widgets[start];
      page.widgets.splice(start, 1);
      page.widgets.splice(end, 0, widgetToModify);
      return page.save();
    });
}

function findAllWidgetsForPage(pageId) {
  // return widgetModel.find({_page: pageId})
  //   .populate('_page')
  //   .exec();

  // use page's widget list here to implement sortable
  return pageModel.findPageById(pageId)
    .then(function(page) {
      return page.widgets;
    });

  // return pageModel.findPageById(pageId)
  //   .populate('widgets')
  //   .then(function(page) {
  //       return page.widgets;
  //     }
  //   )
}

function createWidget(pageId, widget){
  widget._page = pageId;
  return widgetModel.create(widget)
    .then(function(responseWidget) {
      console.log(responseWidget);
      pageModel.findPageById(responseWidget._page)
        .then(function(page) {
          page.widgets.push(responseWidget);

          // the newly created one will not be added into websites without this line
          return page.save();
        });
      return responseWidget;
    });
}

function findWidgetById(widgetId) {
  return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
  widgetModel.findById(widgetId)
    .then(function(foundWidget) {
      pageModel.findPageById(foundWidget._page)
        .then(function(page) {
          for (var i = 0; i < page.widgets.length; i++) {
            if (String(page.widgets[i]._id) === String(widgetId)) {
              page.widgets[i] = widget;
            }
          }
          page.save();
        })
    });
  return widgetModel.update({_id: widgetId}, widget);
}

function deleteWidget(widgetId) {
  widgetModel.findById(widgetId)
    .then(function(widget) {
      pageModel.findPageById(widget._page)
        .then(function(page) {
          page.widgets.pull({_id: widgetId});
          page.save();
        })
    });
  return widgetModel.remove({_id: widgetId});
}
