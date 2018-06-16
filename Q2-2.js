function getVariantsFromScript() {
  var thisProduct = $AWP_ENV.viewData.thisProduct;
  var colorId = thisProduct.mainProductInfo.colorId;
  var availableProd = thisProduct.availableProds[colorId];

  return availableProd.sizedd;
}

function getCompleteVariantInfo() {
  var variantInfo = [];

  var thisProduct = $AWP_ENV.viewData.thisProduct;
  var colorId = thisProduct.mainProductInfo.colorId;
  var availableProd = thisProduct.availableProds[colorId];
  var variants = getVariantsFromScript();
  
  var image_url_primary = thisProduct.largeImages[0];
  var price_current = Number(thisProduct.convertedSalePrice.replace(/\,/g, ''));
  var price_list = Number(thisProduct.convertedListPrice.replace(/\,/g, ''));
  var color = availableProd.colorName;
  
  variantInfo = $.map(variants, function(variant) {
    var in_stock = variant.isAvailable;
    var product_details = JSON.stringify({
      color: color,
      size: variant.sizeName,
    });
    var variant_id = variant.tenDigitSkuId;

    return {
      image_url_primary: image_url_primary,
      in_stock: in_stock,
      price_current: price_current,
      price_list: price_list,
      product_details: product_details,
      variant_id: variant_id,
    }
  });

  return variantInfo;
}

getCompleteVariantInfo();