function getApiUrlInfoFromScript() {
  var viewData = $AWP_ENV.viewData;
  var thisProduct = viewData.thisProduct;

  var currency = viewData.currency;
  var locale = viewData.locale;
  var parent_id = thisProduct._id;
  var shipTo = viewData.shipToCountry;

  return `https://www.ae.com/api/catalog/v1/products/${parent_id}/availability/skus?ctx.locale=${locale}&ctx.shipTo=${shipTo}&ctx.currency=${currency}`;
}

function getAvailability() {
  var availability = [];
  var url = getApiUrlInfoFromScript();

  $.get(url, function(result) {
    var data = result.response.value.data;
    for (variantId in data) {
      availability.push({
        in_stock: data[variantId],
        variant_id: variantId,
      });
    }
  });
  return availability;
}

getAvailability();
