import { Product } from '../product-detail';

export const mockProductsList: Product[] = [
  {
    id: '1',
    name: 'camera',
    description:
      "A DSLR camera. It's great for taking high resolution pictures, and can even film videos. Takes up a lot of memory though.",
    picture: 'assets/product_camera.jpeg',
    price: 600,
  },
  {
    id: '2',
    name: 'makeup set',
    description:
      'A pink makeup set consisting of lipstick and blush. It would make someone look cute!',
    picture: 'assets/product_makeup.jpeg',
    price: 55,
  },
  {
    id: '3',
    name: 'pancakes',
    description:
      'A plate with a stack of pancakes, with caramel drizzled on top, and some walnuts, strawberries, and powdered sugar to boot. Looks delicious.',
    picture: 'assets/product_pancake.jpeg',
    price: 12,
  },
  {
    id: '4',
    name: 'custom sweater',
    description:
      "A custom sweater of your own design. It could look however you'd like.",
    picture: 'assets/product_customsweater.jpg',
    price: 100,
  },
  {
    id: '5',
    name: 'scarf',
    description:
      'A very warm looking scarf. The fabric looks very comfortable.',
    picture: 'assets/product_scarf.jpg',
    price: 40,
  },
  {
    id: '6',
    name: 'sweater',
    description:
      'A pre-knit turtleneck sweater of a solid color. Looks like something your grandmother would make for you.',
    picture: 'assets/product_sweater.jpg',
    price: 65,
  },
];
