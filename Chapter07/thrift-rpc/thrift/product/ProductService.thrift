namespace js com.product

include 'popularity/PopularityService.thrift'

struct Product {
  1: required i32 id
  2: required PopularityService.Popularity feedback
  3: required string productInfo
  4: required string productType
}

exception ProductServiceException {
  1: required string message
}

service ProductService {
  Product getProduct(1: i32 productId) throws (1: ProductServiceException exp)
}