// app/products/data.ts
export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice: string;
  discount: string;
  images: string[];
  sizes: string[];
  description?: string;
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: 1,
    name: 'PEACH POLY GEORGETTE FLORAL PRINTED SUIT SET',
    category: 'printed',
    price: '₹3,496',
    originalPrice: '₹4,995',
    discount: '30% OFF',
    images: [
      '/collection/pinkyellow.png',
      '/collection/rightsidepink.png',
      '/collection/backside.png',
      '/collection/leftside.png',
      '/collection/pink2.png',
      '/collection/frontside.png',
    ],
    sizes: ['30/XS', '32/S', '34/M', '36/L', '38/XL'],
  },
  {
    id: 2,
    name: 'ELEGANT EMBROIDERED STRAIGHT SUIT SET',
    category: 'partywear',
    price: '₹3,299',
    originalPrice: '₹4,599',
    discount: '28% OFF',
    images: [
      '/collection/straightsuitset.png',
      '/collection/straightsuitsetleftside.png',
      '/collection/straightsuitsetbackside.png',
      '/collection/straightsuitsetlookingside.png',
      '/collection/straightsuitsetleftside11.png',
      '/collection/straightsuitsetrightside.png',
    ],
    sizes: ['32/S', '34/M', '36/L', '38/XL', '40/2XL'],
  },
  {
    id: 3,
    name: 'PURPLE RAYON PRINTED SUIT SET',
    category: 'printed',
    price: '₹2,999',
    originalPrice: '₹4,299',
    discount: '30% OFF',
    images: [
      '/collection/purpalrayonprinted.png',
      '/collection/purpalrayonprintedfrontside.png',
      '/collection/purpalrayonprintedleftside.png',
      '/collection/purpalrayonprintedrightside.png',
      '/collection/purpalrayonprintedbackside.png',
    ],
    sizes: ['32/S', '34/M', '36/L', '38/XL', '40/2XL'],
  },
  {
    id: 4,
    name: 'MANGO YELLOW ANARKALI SUIT SET',
    category: 'anarkali',
    price: '₹3,599',
    originalPrice: '₹4,999',
    discount: '28% OFF',
    images: [
      '/collection/Mangoanarkal.png',
      '/collection/Mangoanarkalfrontside.png',
      '/collection/Mangoanarkalleftside.png',
      '/collection/Mangoanarkalrightside.png',
      '/collection/Mangoanarkalbackside.png',
    ],
    sizes: ['32/S', '34/M', '36/L', '38/XL', '40/2XL'],
  },
  {
    id: 5,
    name: 'LIGHT PINK FLORAL PRINTED SUIT SET',
    category: 'printed',
    price: '₹3,199',
    originalPrice: '₹4,499',
    discount: '28% OFF',
    images: [
      '/collection/lightpink.png',
      '/collection/lightpinkfront.png',
      '/collection/lightpinkleft.png',
      '/collection/lightpinkright.png',
      '/collection/lightpinkback.png',
      '/collection/lightpinkoutside.png',
    ],
    sizes: ['30/XS', '32/S', '34/M', '36/L', '38/XL'],
  },
  {
    id: 6,
    name: 'COTTON EMBROIDERED STRAIGHT SUIT SET',
    category: 'cotton',
    price: '₹2,899',
    originalPrice: '₹3,999',
    discount: '27% OFF',
    images: [
      '/collection/cottenstright.png',
      '/collection/cottenstrightfront.png',
      '/collection/cottenstrightback.png',
      '/collection/cottenstrightleft.png',
      '/collection/cottenstrightright.png',
      '/collection/cottenstrighsitting.png',
    ],
    sizes: ['30/XS', '32/S', '34/M', '36/L', '38/XL', '40/2XL'],
  },
  {
    id: 7,
    name: 'FLORAL PRINTED GEORGETTE SUIT SET',
    category: 'printed',
    price: '₹3,299',
    originalPrice: '₹4,699',
    discount: '30% OFF',
    images: [
      '/collection/printed.png',
      '/collection/printedfront.png',
      '/collection/printedback.png',
      '/collection/printedrigth.png',
      '/collection/printedfeshionside.png',
    ],
    sizes: ['30/XS', '32/S', '34/M', '36/L', '38/XL', '40/2XL'],
  },
  {
    id: 8,
    name: 'FLORAL PRINTED STRAIGHT KURTI SET',
    category: 'printed',
    price: '₹2,799',
    originalPrice: '₹3,899',
    discount: '28% OFF',
    images: [
      '/collection/flowerstrightkurti.png',
      '/collection/flowerstrightkurtifrontside.png',
      '/collection/flowerstrightkurtilefrontside.png',
      '/collection/flowerstrightkurtibackeside.png',
      '/collection/flowerstrightkurtirightside.png',
    ],
    sizes: ['30/XS', '32/S', '34/M', '36/L', '38/XL', '40/2XL'],
  },
  {
    id: 9,
    name: 'GREEN COTTON PRINTED SUIT SET',
    category: 'cotton',
    price: '₹2,999',
    originalPrice: '₹4,199',
    discount: '28% OFF',
    images: [
      '/collection/greencotton.png',
      '/collection/greencottonfront.png',
      '/collection/greencottonleft.png',
      '/collection/greencottonback.png',
      '/collection/greencottonleftsidegreat.png',
      '/collection/greencottonrightsidegreat.png',
    ],
    sizes: ['30/XS', '32/S', '34/M', '36/L', '38/XL', '40/2XL'],
  },
];