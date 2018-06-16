function getDataFromDOM() {
  var categories = $('li.bc-item').map(function() {
    return $(this).text();
  }).toArray();
  var rating_count = $('#BVRRContainer #BVRRQuickTakeSummaryID .BVDINumber')
    .map(function() {
      return Number(this.innerText);
    })
    .toArray()
    .reduce(
      function(accumulator, currentValue) {
        return accumulator + currentValue;
      },
      0
    );

  var rating_value = Number($('#BVRRContainer .BVRRRatingNumber')[0].innerText);

  return {
    categories: categories,
    rating_count: rating_count,
    rating_value: rating_value,
  }
}

function getDataFromScript() {
  var thisProduct = $AWP_ENV.viewData.thisProduct;
  var colorId = thisProduct.mainProductInfo.colorId;
  var availableProd = thisProduct.availableProds[colorId];

  var brand = thisProduct.brandname;
  var canonical_url = thisProduct.seoURL;
  var color = availableProd.colorName;
  var currency = thisProduct.currencyCode;
  var description = thisProduct.leadingEquity;
  var image_url_primary = thisProduct.largeImages[0];
  var parent_id = thisProduct._id;
  var price_current = Number(thisProduct.convertedSalePrice.replace(/\,/g, ''));
  var price_list = Number(thisProduct.convertedListPrice.replace(/\,/g, ''));
  var title = thisProduct.prdName;

  return {
    brand: brand,
    canonical_url: canonical_url,
    color: color,
    currency: currency,
    description: description,
    image_url_primary: image_url_primary,
    parent_id: parent_id,
    price_current: price_current,
    price_list: price_list,
    title: title,
  };
}

function getVariantsFromScript() {
  var thisProduct = $AWP_ENV.viewData.thisProduct;
  var colorId = thisProduct.mainProductInfo.colorId;
  var availableProd = thisProduct.availableProds[colorId];

  return availableProd.sizedd;
}

function formatProduct(productInfoFromDOM, productInfoFromScript, variant) {
  var product = {
    parent_id: '',
    variant_id: '',
    canonical_url: '',
    currency: '',
    price_current: 0,
    price_list: 0,
    title: '',
    description: '',
    image_url_primary: '',
    rating_count: 0,
    rating_value: 0,
    product_details: '',
    in_stock: false,
    brand: '',
    categories: [],
  };

  product.parent_id = productInfoFromScript.parent_id;
  product.canonical_url = productInfoFromScript.canonical_url;
  product.variant_id = variant.tenDigitSkuId;
  product.currency = productInfoFromScript.currency;
  product.price_current = productInfoFromScript.price_current;
  product.price_list = productInfoFromScript.price_list;
  product.title = productInfoFromScript.title;
  product.description = productInfoFromScript.description;
  product.image_url_primary = productInfoFromScript.image_url_primary;
  product.rating_count = productInfoFromDOM.rating_count;
  product.rating_value = productInfoFromDOM.rating_value;
  product.product_details = JSON.stringify({
    color: productInfoFromScript.color,
    size: variant.sizeName,
  });
  product.in_stock = variant.isAvailable;
  product.brand = productInfoFromScript.brand;
  product.categories = productInfoFromDOM.categories;

  return product;
}

function getProductInfoListOfUrl() {
  try {
    // Step 1: Extract data from ae's script tag.
    var productInfoFromScript = getDataFromScript();  
    var variants = getVariantsFromScript();

     // Step 2: Extract data from ae's DOM tag.
    var productInfoFromDOM = getDataFromDOM();

    // Process all product's variations
    $.map(variants, function(variant) {
      // Step 3: Format the Data
      var productInfo = formatProduct(productInfoFromDOM, productInfoFromScript, variant);

      // Step 4: Submit data
      console.log(productInfo);
    });

  } catch (e) {
    // Report error.
    console.error(e);
  }
}

getProductInfoListOfUrl();
