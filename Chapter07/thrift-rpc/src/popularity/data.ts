export interface IMockPopularity {
    id: number
    totalStars: number
    review: string
    productId: number
  }
  
  export const MockPopularityDatabase: Array<IMockPopularity> = [
    {
      id: 1,
      totalStars:4,
      review:'Amazing,spectacular',
      productId:1
    },
    {
      id: 2,
      totalStars:5,
      review:'fantabulous',
      productId:2
    },
    {
      id: 3,
      totalStars:4,
      review:'marvellous', 
      productId:3
    },
    {
      id: 4,
      totalStars:5,
      review:'stupendous',
      productId:4
    },
  ]

  //implementation of this can be changed to point to real database.
  
  export function findPopularity(id: number): IMockPopularity | undefined {
    return MockPopularityDatabase.filter((next) => {
      return next.id === id
    })[0]
  }
  