export interface IMockProduct {
    id: number
    productInfo: string
    productType: string,
    feedback?:{
        id:number,
        totalStars:number,
        review:string
        productId:number
    }
  }
  
  export const MockProductDatabase: Array<IMockProduct> = [
    {
      id: 1,
      productInfo: 'Motorola Pulse',
      productType:'Bluetooth earset'
    },
    {
      id: 2,
      productInfo: 'Ghost Backpack',
      productType:'Spectacular anti theft bag'
    },
    {
      id: 3,
      productInfo: 'Xiomi MI A1 Powerbank',
      productType:'Powerbank for 20,000 mah'
    },
    {
      id: 4,
      productInfo: 'Typescript Microservices',
      productType:'Upcoming book by me :P'
    },
  ]
  
  export function findProduct(id: number): IMockProduct | undefined {
    return MockProductDatabase.filter((next) => {
      return next.id === id
    })[0]
  }
  