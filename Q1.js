function scrapeData() {
  var product = {
    title: '',
    description: '',
    categories: [], // array of string
    parent_id: '', // string
    price_current: 0, // float
    price_list: 0, // float
  };

  product.title = $('h1.psp-product-name')[0].innerHTML;
  product.description = $('.pdp-about-details-txt.pdp-about-details-equit')[0].innerHTML;
  product.categories = $('li.bc-item').map(function() {
    return $(this).text();
  });
  product.parent_id = window.location.pathname.split('/').pop();
  product.price_current = Number($('#psp-sale-price')[0].innerHTML);
  product.price_list = Number($('#psp-regular-price')[0].innerHTML.replace(/\,/g, ''));
  
  return product;
}
