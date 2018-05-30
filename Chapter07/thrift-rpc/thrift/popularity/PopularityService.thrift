namespace js com.popularity
struct Popularity {
    1: required i32 id
    2: required i32 totalStars
    3: required string review
    4: required i32 productId
}
exception PopularityServiceException {
    1: required string message
}
service PopularityService {
    Popularity getPopularityByProduct(4: i32 productId) throws (1: PopularityServiceException exp)
}