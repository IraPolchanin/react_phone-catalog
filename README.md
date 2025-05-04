# React Product Catalog

Implement the catalog with a shopping cart and favorites page according to one of the next designs:

- [Original](<https://www.figma.com/file/T5ttF21UnT6RRmCQQaZc6L/Phone-catalog-(V2)-Original>)
- [Original Dark](<https://www.figma.com/file/BUusqCIMAWALqfBahnyIiH/Phone-catalog-(V2)-Original-Dark>)
- [Rounded Blue](<https://www.figma.com/file/FRxncC4lfyhs6og1L6FGEU/Phone-catalog-(V2)-Rounded-Style-2?node-id=0%3A1>)
- [Rounded Purple](<https://www.figma.com/file/xMK2Dy0mfBbJJSNctmOuLW/Phone-catalog-(V2)-Rounded-Style-1?node-id=0%3A1>)
- [Rounded Orange](<https://www.figma.com/file/7JTa0q8n3dTSAyMNaA0u8o/Phone-catalog-(V2)-Rounded-Style-3?node-id=0%3A1>)

You may also implement color theme switching!

## If you work in a team

Follow the [Work in a team guideline](https://github.com/mate-academy/react_task-guideline/blob/master/team-flow.md#how-to-work-in-a-team)

## Project Setup from scratch

Follow the [Instruction](https://github.com/mate-academy/react_phone-catalog/blob/master/setup.md) to setup your project, add Eslint, Prettier, Husky and enable auto deploy.

## Data

Use the data from `/public/api` and images from `/public/img` folders. You can reorganize them the way you like.

## App

1. Put components into the `src/components` folder.
   - Each component should be a folder with `index.ts`, `ComponentName.tsx`, `ComponentName.module.scss` files.
   - Use CSS modules.
   - Keep `.module.scss` files together with their components.
2. Advanced project structure:
   - `src/modules` folder. Inside per page modules `HomePage`, `CartPage`, etc., and `shared` folder with shared content between modules.
   - Inside each module its own `components` folder with the structure described above. And optionally other files/folders: `hooks`, `constants`, and so on.
3. Add the sticky header with a logo, navigation, favorites, and cart.
4. The footer with the link to the GitHub repo and `Back to top` button.
   - The content should be limited to the same width as the page content;
   - `Back to top` button should scroll to the top smoothly;
5. Add `NotFoundPage` containing text `Page not found` for all the unknown URLs.
6. All changes the hover effects should be smooth.
7. Scale all image links by 10% on hover.
8. Implement all form elements and icons according to the UI Kit.

## Home page

Implement Home page at available at `/`.

1. `<h1>Product Catalog</h1>` should be visually hidden.
2. `PicturesSlider`:
   - Find your own images to personalize the App;
   - Change pictures automatically every 5 seconds;
   - The next buttons should show the first image after the last one;
   - Dashes at the bottom should allow choosing an exact picture.
3. `ProductsSlider` for the `Hot prices` block:
   - The products with a discount starting from the biggest absolute value;
   - `<` and `>` buttons should scroll products.
4. `Shop by category` block with links to `/phones`, `/tablets`, and `/accessories`.
5. Add Brand new block using ProductsSlider with products that are the newest according to the year field.

## Product pages

There should be 3 separate pages `/phones`, `/tablets`, and `/accessories`.

1. Each page loads the data of the required `type`.
2. Add an `h1` with `Phones/Tablets/Accessories page` (choose required).
3. Add `ProductsList` component showing all the `products`.
4. Implement a `Loader` to show it while waiting for the data from the server.
5. In case of a loading error show the something went wrong message with a reload button.
6. If there are no products available show the `There are no phones/tablets/accessories yet` message (choose required).
7. Add a `<select>` with the `Newest`, `Alphabetically`, and `Cheapest` options to sort products by `age`, `title`, or `price` (after discount).
   - Save the sort value in the URL `?sort=age` and apply it after the page reload.
8. Add `Pagination` buttons and `Items on page` select element with `4`, `8`, `16`, and `all` options.
   - It should limit the products you show to the user;
   - Save pagination params in the URL `?page=2&perPage=8` (`page=1` and `perPage=all` are the default values and should not be added to the URL;
   - Hide pagination elements if they do not make sense;
   - You can use the logic explained in [the React Pagination task](https://github.com/mate-academy/react_pagination#react-pagination).

## Product details page

Create `ProductDetailsPage` available at `/product/:productId`.

1. `ProductCard` image and title should be links to the product details page.
2. Use `Loader` when fetching the product details.
3. Show the details on the page:
   - Display the available colors from colorsAvailable and the capacities from capacityAvailable as radio inputs, allowing the selection of one value from the offered options;
   - `About` section should contain a subheader with description;
   - Choose `Tech specs` you want to show.
4. Add the ability to choose a picture.
5. Implement `You may also like` block with products chosen randomly:
   - Create `getSuggestedProducts` method fetching the suggested products.
6. Add `Back` button working the same way as a Browser `Back` button.
7. Add `Breadcrumbs` at the top with:
   - A Home page link;
   - A category page link (`Phones`, `Tablets`, `Accessories`);
   - The name of the product (just a text).
8. Show `Product was not found` if there is no product with a given id on the server.

## Shopping Cart page

Create a Cart page with a list of `CartItem`s at `/cart`.
Each item should have an `id`, `quantity`, and a `product`.
Use React Context or Redux to store Items.

1. `Add to cart` button in the `ProductCard` should add a product to the `Cart`.
2. If the product is already in the `Cart` the button should say `Added to cart` and do nothing.
3. Add the ability to remove items from the `Cart` with an `x` button next to a `CartItem`.
4. Add a message `Your cart is empty` when there are no products in the `Cart`.
5. Add the ability to change the item quantity in the `Cart` with `-` and `+` buttons (it should be > 0).
6. Total amount and quantity should be calculated automatically.
7. Show the quantity at the `Cart` icon in the header.
8. Save the `Cart` to `localStorage` on each change and read it on page load.
9. `Checkout` button should show a modal dialog with the text `Checkout is not implemented yet. Do you want to clear the Cart?`:
   - Clear the Cart if the user confirms the order;
   - Keep the Cart items and close the confirmation on cancel;
   - Use the `confirm` function if you don't have a better solution.

## Favorites page

Create `Favorites` page with a `ProductsList` showing favorite products at `/favorites`.

1. Add/remove a product to favorites by pressing a heart button in the `ProductCard` element.
2. The heart should be highlighted if the product is already added to the favorites.
3. Use React Context or Redux to store the favorites.
4. Show the number of favorites at the `Favorites` icon in the header.
5. Save favorites to `localStorage` on each change and load them on page load.

## Other tasks

1. Add `NotFoundPage` containing text `Page not found` for all the other URLs with the link to `HomePage`.
2. Implement the `Product was not found` state for the `ProductDetailsPage`.

## (\*) Advanced tasks

- Implement color theme switching!
- Use [skeletons](https://freefrontend.com/css-skeleton-loadings/) to make loading more natural.
- Add the ability to change page language.

### Search

Show `input:search` in the header when a page contains a `ProductList` to search in.

1. Save the `Search` value in the URL as a `?query=value` to apply on page load.
2. Show `There are no phones/tablets/accessories/products matching the query` instead of `ProductList` when needed.
3. Add `debounce` to the search field.

```
react_phone-catalog
├─ .editorconfig
├─ .env
├─ .eslintignore
├─ .eslintrc.cjs
├─ .prettierignore
├─ .prettierrc
├─ .stylelintignore
├─ .stylelintrc.js
├─ LICENSE
├─ README.md
├─ cypress
│  ├─ integration
│  │  └─ page.spec.js
│  ├─ support
│  │  ├─ commands.ts
│  │  ├─ component-index.html
│  │  ├─ component.ts
│  │  └─ e2e.ts
│  └─ tsconfig.json
├─ cypress.config.ts
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ api
│  │  ├─ accessories.json
│  │  ├─ phones.json
│  │  ├─ products.json
│  │  └─ tablets.json
│  ├─ fonts
│  │  ├─ Mont-Bold.otf
│  │  ├─ Mont-Regular.otf
│  │  └─ Mont-SemiBold.otf
│  └─ img
│     ├─ accessories
│     │  ├─ apple-watch-se
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  ├─ silver
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  └─ space-gray
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     └─ 02.webp
│     │  ├─ apple-watch-series-3
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  ├─ silver
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  └─ space-gray
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     └─ 02.webp
│     │  ├─ apple-watch-series-4
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  ├─ silver
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  └─ space-gray
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     └─ 02.webp
│     │  ├─ apple-watch-series-5
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  ├─ silver
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  └─ space-gray
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     └─ 02.webp
│     │  └─ apple-watch-series-6
│     │     ├─ blue
│     │     │  ├─ 00.webp
│     │     │  ├─ 01.webp
│     │     │  └─ 02.webp
│     │     ├─ gold
│     │     │  ├─ 00.webp
│     │     │  ├─ 01.webp
│     │     │  └─ 02.webp
│     │     ├─ red
│     │     │  ├─ 00.webp
│     │     │  ├─ 01.webp
│     │     │  └─ 02.webp
│     │     ├─ silver
│     │     │  ├─ 00.webp
│     │     │  ├─ 01.webp
│     │     │  └─ 02.webp
│     │     └─ space-gray
│     │        ├─ 00.webp
│     │        ├─ 01.webp
│     │        └─ 02.webp
│     ├─ banner-accessories.png
│     ├─ banner-phones.png
│     ├─ banner-tablets.png
│     ├─ cart-is-empty.png
│     ├─ category-accessories.png
│     ├─ category-accessories.webp
│     ├─ category-phones.png
│     ├─ category-phones.webp
│     ├─ category-tablets.png
│     ├─ category-tablets.webp
│     ├─ page-not-found.png
│     ├─ phones
│     │  ├─ apple-iphone-11
│     │  │  ├─ black
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  ├─ green
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  ├─ purple
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  ├─ red
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  ├─ white
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  └─ yellow
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     ├─ 02.webp
│     │  │     ├─ 03.webp
│     │  │     └─ 04.webp
│     │  ├─ apple-iphone-11-pro
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  ├─ midnightgreen
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  ├─ silver
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  └─ spacegray
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     └─ 02.webp
│     │  ├─ apple-iphone-11-pro-max
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  ├─ midnightgreen
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  ├─ silver
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  └─ spacegray
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     └─ 02.webp
│     │  ├─ apple-iphone-12
│     │  │  ├─ black
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  ├─ purple
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  ├─ red
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  └─ white
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     ├─ 03.webp
│     │  │     └─ 04.webp
│     │  ├─ apple-iphone-13-mini
│     │  │  ├─ blue
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  ├─ midnight
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  ├─ pink
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  └─ white
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     ├─ 02.webp
│     │  │     └─ 03.webp
│     │  ├─ apple-iphone-13-pro-max
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  ├─ graphite
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  └─ sierrablue
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     ├─ 02.webp
│     │  │     └─ 03.webp
│     │  ├─ apple-iphone-14
│     │  │  ├─ midnight
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  ├─ purple
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  └─ yellow
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     ├─ 02.webp
│     │  │     ├─ 03.webp
│     │  │     └─ 04.webp
│     │  ├─ apple-iphone-14-pro
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  └─ spaceblack
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     ├─ 02.webp
│     │  │     ├─ 03.webp
│     │  │     └─ 04.webp
│     │  ├─ apple-iphone-7
│     │  │  ├─ black
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  ├─ rosegold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  └─ silver
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     ├─ 02.webp
│     │  │     ├─ 03.webp
│     │  │     └─ 04.webp
│     │  ├─ apple-iphone-7-plus
│     │  │  ├─ black
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  ├─ rosegold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  └─ silver
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     ├─ 02.webp
│     │  │     ├─ 03.webp
│     │  │     └─ 04.webp
│     │  ├─ apple-iphone-8
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  ├─ silver
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  └─ spacegray
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     ├─ 02.webp
│     │  │     └─ 03.webp
│     │  ├─ apple-iphone-xr
│     │  │  ├─ coral
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  ├─ red
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  ├─ white
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  └─ yellow
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     ├─ 02.webp
│     │  │     ├─ 03.webp
│     │  │     └─ 04.webp
│     │  ├─ apple-iphone-xs
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  └─ spacegray
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     ├─ 02.webp
│     │  │     ├─ 03.webp
│     │  │     └─ 04.webp
│     │  └─ apple-iphone-xs-max
│     │     ├─ gold
│     │     │  ├─ 00.webp
│     │     │  ├─ 01.webp
│     │     │  ├─ 02.webp
│     │     │  ├─ 03.webp
│     │     │  └─ 04.webp
│     │     ├─ silver
│     │     │  ├─ 00.webp
│     │     │  ├─ 01.webp
│     │     │  ├─ 02.webp
│     │     │  ├─ 03.webp
│     │     │  └─ 04.webp
│     │     └─ spacegray
│     │        ├─ 00.webp
│     │        ├─ 01.webp
│     │        ├─ 02.webp
│     │        ├─ 03.webp
│     │        └─ 04.webp
│     ├─ picthree.bdd2e0fc.png
│     ├─ product-not-found.png
│     ├─ svg
│     │  ├─ icons
│     │  │  ├─ arrow_down.svg
│     │  │  ├─ arrow_left.svg
│     │  │  ├─ arrow_right.svg
│     │  │  ├─ arrow_up.svg
│     │  │  ├─ close.svg
│     │  │  ├─ favourites.svg
│     │  │  ├─ favourites_filled.svg
│     │  │  ├─ home.svg
│     │  │  ├─ menu.svg
│     │  │  ├─ minus.svg
│     │  │  ├─ plus.svg
│     │  │  ├─ search.svg
│     │  │  └─ shopping_bag.svg
│     │  ├─ logo.svg
│     │  └─ logoOK.svg
│     └─ tablets
│        ├─ apple-ipad-10-2-2020
│        │  ├─ gold
│        │  │  ├─ 00.webp
│        │  │  ├─ 01.webp
│        │  │  ├─ 02.webp
│        │  │  └─ 03.webp
│        │  ├─ silver
│        │  │  ├─ 00.webp
│        │  │  ├─ 01.webp
│        │  │  ├─ 02.webp
│        │  │  └─ 03.webp
│        │  └─ spacegray
│        │     ├─ 00.webp
│        │     ├─ 01.webp
│        │     ├─ 02.webp
│        │     └─ 03.webp
│        ├─ apple-ipad-air-4th-gen
│        │  ├─ green
│        │  │  ├─ 00.webp
│        │  │  ├─ 02.webp
│        │  │  ├─ 03.webp
│        │  │  └─ 04.webp
│        │  ├─ rose-gold
│        │  │  ├─ 00.webp
│        │  │  ├─ 01.webp
│        │  │  ├─ 02.webp
│        │  │  └─ 03.webp
│        │  ├─ silver
│        │  │  ├─ 00.webp
│        │  │  ├─ 01.webp
│        │  │  ├─ 02.webp
│        │  │  └─ 03.webp
│        │  └─ sky-blue
│        │     ├─ 00.webp
│        │     ├─ 01.webp
│        │     ├─ 02.webp
│        │     └─ 03.webp
│        ├─ apple-ipad-mini-5th-gen
│        │  ├─ gold
│        │  │  ├─ 00.webp
│        │  │  └─ 01.webp
│        │  ├─ silver
│        │  │  ├─ 00.webp
│        │  │  └─ 01.webp
│        │  └─ spacegray
│        │     ├─ 00.webp
│        │     └─ 01.webp
│        ├─ apple-ipad-mini-6th-gen
│        │  ├─ pink
│        │  │  ├─ 00.webp
│        │  │  ├─ 01.webp
│        │  │  └─ 02.webp
│        │  ├─ spacegray
│        │  │  ├─ 00.webp
│        │  │  ├─ 01.webp
│        │  │  └─ 02.webp
│        │  └─ starlight
│        │     ├─ 00.webp
│        │     ├─ 01.webp
│        │     └─ 02.webp
│        └─ apple-ipad-pro-11-2021
│           ├─ silver
│           │  ├─ 00.webp
│           │  ├─ 01.webp
│           │  └─ 02.webp
│           └─ spacegray
│              ├─ 00.webp
│              ├─ 01.webp
│              └─ 02.webp
├─ setup.md
├─ src
│  ├─ App.tsx
│  ├─ Root.tsx
│  ├─ components
│  │  ├─ Breadcrumbs
│  │  │  ├─ Breadcrumbs.module.scss
│  │  │  ├─ Breadcrumbs.tsx
│  │  │  └─ index.ts
│  │  ├─ Button
│  │  │  ├─ Button.module.scss
│  │  │  ├─ Button.tsx
│  │  │  └─ index.ts
│  │  ├─ IconButton
│  │  │  ├─ IconButton.module.scss
│  │  │  ├─ IconButton.tsx
│  │  │  └─ index.ts
│  │  ├─ IconLink
│  │  │  ├─ IconLink.module.scss
│  │  │  ├─ IconLink.tsx
│  │  │  └─ index.ts
│  │  └─ ScrollToTop
│  │     ├─ ScrollToTop.tsx
│  │     └─ index.ts
│  ├─ contexts
│  │  ├─ CartContext.tsx
│  │  ├─ FavoritesContext.tsx
│  │  └─ ProductsContext.tsx
│  ├─ index.tsx
│  ├─ modules
│  │  ├─ CartPage
│  │  │  ├─ CartPage.module.scss
│  │  │  ├─ CartPage.tsx
│  │  │  └─ components
│  │  │     ├─ CartItem
│  │  │     │  ├─ CartItem.module.scss
│  │  │     │  ├─ CartItem.tsx
│  │  │     │  └─ index.ts
│  │  │     └─ CartTotal
│  │  │        ├─ CartTotal.module.scss
│  │  │        ├─ CartTotal.tsx
│  │  │        └─ index.ts
│  │  ├─ FavoritesPage
│  │  │  ├─ FavoritesPage.module.scss
│  │  │  ├─ FavoritesPage.tsx
│  │  │  └─ components
│  │  │     └─ FavoritesList
│  │  │        ├─ FavoritesList.module.scss
│  │  │        ├─ FavoritesList.tsx
│  │  │        └─ index.ts
│  │  ├─ HomePage
│  │  │  ├─ HomePage.module.scss
│  │  │  ├─ HomePage.tsx
│  │  │  └─ components
│  │  │     ├─ CategorySection
│  │  │     │  ├─ CategorySection.module.scss
│  │  │     │  ├─ CategorySection.tsx
│  │  │     │  └─ index.ts
│  │  │     ├─ PicturesSlider
│  │  │     │  ├─ PicturesSlider.module.scss
│  │  │     │  ├─ PicturesSlider.tsx
│  │  │     │  └─ index.ts
│  │  │     └─ ProductsSlider
│  │  │        ├─ ProductsSlider.module.scss
│  │  │        ├─ ProductsSlider.tsx
│  │  │        └─ index.ts
│  │  ├─ NotFoundPage
│  │  │  ├─ NotFoundPage.module.scss
│  │  │  ├─ NotFoundPage.tsx
│  │  │  └─ index.ts
│  │  ├─ ProductDetailsPage
│  │  │  ├─ ProductDetailsPage.module.scss
│  │  │  ├─ ProductDetailsPage.tsx
│  │  │  └─ components
│  │  │     └─ ProductGallery
│  │  │        ├─ ProductGallery.module.scss
│  │  │        ├─ ProductGallery.tsx
│  │  │        └─ index.ts
│  │  ├─ ProductPage
│  │  │  ├─ ProductPage.module.scss
│  │  │  ├─ ProductPage.tsx
│  │  │  └─ components
│  │  │     └─ ProductList
│  │  │        ├─ ProductList.module.scss
│  │  │        ├─ ProductList.tsx
│  │  │        └─ index.ts
│  │  └─ shared
│  │     └─ components
│  │        ├─ Footer
│  │        │  ├─ Footer.module.scss
│  │        │  ├─ Footer.tsx
│  │        │  └─ index.ts
│  │        ├─ Header
│  │        │  ├─ Header.module.scss
│  │        │  ├─ Header.tsx
│  │        │  ├─ components
│  │        │  │  ├─ HeaderCartCount
│  │        │  │  │  ├─ HeaderCartCount.tsx
│  │        │  │  │  └─ index.ts
│  │        │  │  └─ HeaderFavoritesCount
│  │        │  │     ├─ HeaderFavoritesCount.module.scss
│  │        │  │     ├─ HeaderFavoritesCount.tsx
│  │        │  │     └─ index.ts
│  │        │  └─ index.ts
│  │        ├─ Navigation
│  │        │  ├─ Navigation.module.scss
│  │        │  ├─ Navigation.tsx
│  │        │  └─ index.ts
│  │        └─ ProductCard
│  │           ├─ ProductCard.module.scss
│  │           ├─ ProductCard.tsx
│  │           └─ index.ts
│  ├─ styles
│  │  ├─ abstracts
│  │  │  ├─ _abstracts.scss
│  │  │  ├─ _mixins.scss
│  │  │  ├─ _placeholders.scss
│  │  │  └─ _variables.scss
│  │  ├─ base
│  │  │  ├─ _base.scss
│  │  │  ├─ _fonts.scss
│  │  │  ├─ _normalize.scss
│  │  │  └─ _typography.scss
│  │  ├─ global.scss
│  │  └─ layout
│  │     ├─ _container.scss
│  │     ├─ _layout.scss
│  │     └─ _page.scss
│  ├─ types
│  │  ├─ CartItem.ts
│  │  ├─ CartState.ts
│  │  ├─ FavoritesTypes.ts
│  │  ├─ Product.ts
│  │  └─ index.ts
│  ├─ utils
│  │  └─ api.ts
│  └─ vite-env.d.ts
├─ tsconfig.json
└─ vite.config.ts

```

```
react_phone-catalog
├─ .editorconfig
├─ .env
├─ .eslintignore
├─ .eslintrc.cjs
├─ .husky
│  ├─ _
│  │  ├─ applypatch-msg
│  │  ├─ commit-msg
│  │  ├─ h
│  │  ├─ husky.sh
│  │  ├─ post-applypatch
│  │  ├─ post-checkout
│  │  ├─ post-commit
│  │  ├─ post-merge
│  │  ├─ post-rewrite
│  │  ├─ pre-applypatch
│  │  ├─ pre-auto-gc
│  │  ├─ pre-commit
│  │  ├─ pre-merge-commit
│  │  ├─ pre-push
│  │  ├─ pre-rebase
│  │  └─ prepare-commit-msg
│  └─ pre-commit
├─ .prettierignore
├─ .prettierrc
├─ .stylelintignore
├─ .stylelintrc.js
├─ LICENSE
├─ README.md
├─ cypress
│  ├─ integration
│  │  └─ page.spec.js
│  ├─ support
│  │  ├─ commands.ts
│  │  ├─ component-index.html
│  │  ├─ component.ts
│  │  └─ e2e.ts
│  └─ tsconfig.json
├─ cypress.config.ts
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ api
│  │  ├─ accessories.json
│  │  ├─ phones.json
│  │  ├─ products.json
│  │  └─ tablets.json
│  ├─ fonts
│  │  ├─ Mont-Bold.otf
│  │  ├─ Mont-Regular.otf
│  │  └─ Mont-SemiBold.otf
│  └─ img
│     ├─ accessories
│     │  ├─ apple-watch-se
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  ├─ silver
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  └─ space-gray
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     └─ 02.webp
│     │  ├─ apple-watch-series-3
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  ├─ silver
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  └─ space-gray
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     └─ 02.webp
│     │  ├─ apple-watch-series-4
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  ├─ silver
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  └─ space-gray
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     └─ 02.webp
│     │  ├─ apple-watch-series-5
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  ├─ silver
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  └─ space-gray
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     └─ 02.webp
│     │  └─ apple-watch-series-6
│     │     ├─ blue
│     │     │  ├─ 00.webp
│     │     │  ├─ 01.webp
│     │     │  └─ 02.webp
│     │     ├─ gold
│     │     │  ├─ 00.webp
│     │     │  ├─ 01.webp
│     │     │  └─ 02.webp
│     │     ├─ red
│     │     │  ├─ 00.webp
│     │     │  ├─ 01.webp
│     │     │  └─ 02.webp
│     │     ├─ silver
│     │     │  ├─ 00.webp
│     │     │  ├─ 01.webp
│     │     │  └─ 02.webp
│     │     └─ space-gray
│     │        ├─ 00.webp
│     │        ├─ 01.webp
│     │        └─ 02.webp
│     ├─ banner-accessories.png
│     ├─ banner-phones.png
│     ├─ banner-tablets.png
│     ├─ cart-is-empty.png
│     ├─ category-accessories.png
│     ├─ category-accessories.webp
│     ├─ category-phones.png
│     ├─ category-phones.webp
│     ├─ category-tablets.png
│     ├─ category-tablets.webp
│     ├─ page-not-found.png
│     ├─ phones
│     │  ├─ apple-iphone-11
│     │  │  ├─ black
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  ├─ green
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  ├─ purple
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  ├─ red
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  ├─ white
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  └─ yellow
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     ├─ 02.webp
│     │  │     ├─ 03.webp
│     │  │     └─ 04.webp
│     │  ├─ apple-iphone-11-pro
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  ├─ midnightgreen
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  ├─ silver
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  └─ spacegray
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     └─ 02.webp
│     │  ├─ apple-iphone-11-pro-max
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  ├─ midnightgreen
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  ├─ silver
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  └─ spacegray
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     └─ 02.webp
│     │  ├─ apple-iphone-12
│     │  │  ├─ black
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  ├─ purple
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  ├─ red
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  └─ white
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     ├─ 03.webp
│     │  │     └─ 04.webp
│     │  ├─ apple-iphone-13-mini
│     │  │  ├─ blue
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  ├─ midnight
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  ├─ pink
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  └─ white
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     ├─ 02.webp
│     │  │     └─ 03.webp
│     │  ├─ apple-iphone-13-pro-max
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  ├─ graphite
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  └─ sierrablue
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     ├─ 02.webp
│     │  │     └─ 03.webp
│     │  ├─ apple-iphone-14
│     │  │  ├─ midnight
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  ├─ purple
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  └─ yellow
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     ├─ 02.webp
│     │  │     ├─ 03.webp
│     │  │     └─ 04.webp
│     │  ├─ apple-iphone-14-pro
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  └─ spaceblack
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     ├─ 02.webp
│     │  │     ├─ 03.webp
│     │  │     └─ 04.webp
│     │  ├─ apple-iphone-7
│     │  │  ├─ black
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  ├─ rosegold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  └─ silver
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     ├─ 02.webp
│     │  │     ├─ 03.webp
│     │  │     └─ 04.webp
│     │  ├─ apple-iphone-7-plus
│     │  │  ├─ black
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  ├─ rosegold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  └─ silver
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     ├─ 02.webp
│     │  │     ├─ 03.webp
│     │  │     └─ 04.webp
│     │  ├─ apple-iphone-8
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  ├─ silver
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  └─ spacegray
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     ├─ 02.webp
│     │  │     └─ 03.webp
│     │  ├─ apple-iphone-xr
│     │  │  ├─ coral
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  └─ 02.webp
│     │  │  ├─ red
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  ├─ white
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  └─ 03.webp
│     │  │  └─ yellow
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     ├─ 02.webp
│     │  │     ├─ 03.webp
│     │  │     └─ 04.webp
│     │  ├─ apple-iphone-xs
│     │  │  ├─ gold
│     │  │  │  ├─ 00.webp
│     │  │  │  ├─ 01.webp
│     │  │  │  ├─ 02.webp
│     │  │  │  ├─ 03.webp
│     │  │  │  └─ 04.webp
│     │  │  └─ spacegray
│     │  │     ├─ 00.webp
│     │  │     ├─ 01.webp
│     │  │     ├─ 02.webp
│     │  │     ├─ 03.webp
│     │  │     └─ 04.webp
│     │  └─ apple-iphone-xs-max
│     │     ├─ gold
│     │     │  ├─ 00.webp
│     │     │  ├─ 01.webp
│     │     │  ├─ 02.webp
│     │     │  ├─ 03.webp
│     │     │  └─ 04.webp
│     │     ├─ silver
│     │     │  ├─ 00.webp
│     │     │  ├─ 01.webp
│     │     │  ├─ 02.webp
│     │     │  ├─ 03.webp
│     │     │  └─ 04.webp
│     │     └─ spacegray
│     │        ├─ 00.webp
│     │        ├─ 01.webp
│     │        ├─ 02.webp
│     │        ├─ 03.webp
│     │        └─ 04.webp
│     ├─ picthree.bdd2e0fc.png
│     ├─ product-not-found.png
│     ├─ svg
│     │  ├─ icons
│     │  │  ├─ arrow_down.svg
│     │  │  ├─ arrow_left.svg
│     │  │  ├─ arrow_right.svg
│     │  │  ├─ arrow_up.svg
│     │  │  ├─ close.svg
│     │  │  ├─ favourites.svg
│     │  │  ├─ favourites_filled.svg
│     │  │  ├─ home.svg
│     │  │  ├─ menu.svg
│     │  │  ├─ minus.svg
│     │  │  ├─ plus.svg
│     │  │  ├─ search.svg
│     │  │  └─ shopping_bag.svg
│     │  ├─ logo.svg
│     │  └─ logoOK.svg
│     └─ tablets
│        ├─ apple-ipad-10-2-2020
│        │  ├─ gold
│        │  │  ├─ 00.webp
│        │  │  ├─ 01.webp
│        │  │  ├─ 02.webp
│        │  │  └─ 03.webp
│        │  ├─ silver
│        │  │  ├─ 00.webp
│        │  │  ├─ 01.webp
│        │  │  ├─ 02.webp
│        │  │  └─ 03.webp
│        │  └─ spacegray
│        │     ├─ 00.webp
│        │     ├─ 01.webp
│        │     ├─ 02.webp
│        │     └─ 03.webp
│        ├─ apple-ipad-air-4th-gen
│        │  ├─ green
│        │  │  ├─ 00.webp
│        │  │  ├─ 02.webp
│        │  │  ├─ 03.webp
│        │  │  └─ 04.webp
│        │  ├─ rose-gold
│        │  │  ├─ 00.webp
│        │  │  ├─ 01.webp
│        │  │  ├─ 02.webp
│        │  │  └─ 03.webp
│        │  ├─ silver
│        │  │  ├─ 00.webp
│        │  │  ├─ 01.webp
│        │  │  ├─ 02.webp
│        │  │  └─ 03.webp
│        │  └─ sky-blue
│        │     ├─ 00.webp
│        │     ├─ 01.webp
│        │     ├─ 02.webp
│        │     └─ 03.webp
│        ├─ apple-ipad-mini-5th-gen
│        │  ├─ gold
│        │  │  ├─ 00.webp
│        │  │  └─ 01.webp
│        │  ├─ silver
│        │  │  ├─ 00.webp
│        │  │  └─ 01.webp
│        │  └─ spacegray
│        │     ├─ 00.webp
│        │     └─ 01.webp
│        ├─ apple-ipad-mini-6th-gen
│        │  ├─ pink
│        │  │  ├─ 00.webp
│        │  │  ├─ 01.webp
│        │  │  └─ 02.webp
│        │  ├─ spacegray
│        │  │  ├─ 00.webp
│        │  │  ├─ 01.webp
│        │  │  └─ 02.webp
│        │  └─ starlight
│        │     ├─ 00.webp
│        │     ├─ 01.webp
│        │     └─ 02.webp
│        └─ apple-ipad-pro-11-2021
│           ├─ silver
│           │  ├─ 00.webp
│           │  ├─ 01.webp
│           │  └─ 02.webp
│           └─ spacegray
│              ├─ 00.webp
│              ├─ 01.webp
│              └─ 02.webp
├─ setup.md
├─ src
│  ├─ App.tsx
│  ├─ Root.tsx
│  ├─ components
│  │  ├─ Breadcrumbs
│  │  │  ├─ Breadcrumbs.module.scss
│  │  │  ├─ Breadcrumbs.tsx
│  │  │  └─ index.ts
│  │  ├─ Button
│  │  │  ├─ Button.module.scss
│  │  │  ├─ Button.tsx
│  │  │  └─ index.ts
│  │  ├─ Icon
│  │  │  ├─ Icon.module.scss
│  │  │  ├─ Icon.tsx
│  │  │  └─ index.ts
│  │  ├─ Loader
│  │  │  ├─ Loader.module.scss
│  │  │  ├─ Loader.tsx
│  │  │  └─ index.ts
│  │  ├─ Logo
│  │  │  ├─ Logo.module.scss
│  │  │  ├─ Logo.tsx
│  │  │  └─ index.ts
│  │  ├─ Pagination
│  │  │  ├─ Pagination.module.scss
│  │  │  ├─ Pagination.tsx
│  │  │  └─ index.ts
│  │  ├─ ScrollToTop
│  │  │  ├─ ScrollToTop.tsx
│  │  │  └─ index.ts
│  │  └─ SuggestedProducts
│  │     ├─ SuggestedProducts.module.scss
│  │     ├─ SuggestedProducts.tsx
│  │     └─ index.ts
│  ├─ contexts
│  │  ├─ CartContext.tsx
│  │  ├─ FavoritesContext.tsx
│  │  └─ ProductsContext.tsx
│  ├─ index.tsx
│  ├─ modules
│  │  ├─ CartPage
│  │  │  ├─ CartPage.module.scss
│  │  │  ├─ CartPage.tsx
│  │  │  └─ components
│  │  │     ├─ CartItem
│  │  │     │  ├─ CartItem.module.scss
│  │  │     │  ├─ CartItem.tsx
│  │  │     │  └─ index.ts
│  │  │     └─ CartTotal
│  │  │        ├─ CartTotal.module.scss
│  │  │        ├─ CartTotal.tsx
│  │  │        └─ index.ts
│  │  ├─ FavoritesPage
│  │  │  ├─ FavoritesPage.module.scss
│  │  │  ├─ FavoritesPage.tsx
│  │  │  └─ components
│  │  │     └─ FavoritesList
│  │  │        ├─ FavoritesList.module.scss
│  │  │        ├─ FavoritesList.tsx
│  │  │        └─ index.ts
│  │  ├─ HomePage
│  │  │  ├─ HomePage.module.scss
│  │  │  ├─ HomePage.tsx
│  │  │  └─ components
│  │  │     ├─ CategorySection
│  │  │     │  ├─ CategorySection.module.scss
│  │  │     │  ├─ CategorySection.tsx
│  │  │     │  └─ index.ts
│  │  │     ├─ PicturesSlider
│  │  │     │  ├─ PicturesSlider.module.scss
│  │  │     │  ├─ PicturesSlider.tsx
│  │  │     │  └─ index.ts
│  │  │     └─ ProductsSlider
│  │  │        ├─ ProductsSlider.module.scss
│  │  │        ├─ ProductsSlider.tsx
│  │  │        └─ index.ts
│  │  ├─ NotFoundPage
│  │  │  ├─ NotFoundPage.module.scss
│  │  │  ├─ NotFoundPage.tsx
│  │  │  └─ index.ts
│  │  ├─ ProductDetailsPage
│  │  │  ├─ ProductDetailsPage.module.scss
│  │  │  ├─ ProductDetailsPage.tsx
│  │  │  └─ components
│  │  │     └─ ProductGallery
│  │  │        ├─ ProductGallery.module.scss
│  │  │        ├─ ProductGallery.tsx
│  │  │        └─ index.ts
│  │  ├─ ProductPage
│  │  │  ├─ ProductPage.module.scss
│  │  │  ├─ ProductPage.tsx
│  │  │  └─ components
│  │  │     └─ ProductList
│  │  │        ├─ ProductList.module.scss
│  │  │        ├─ ProductList.tsx
│  │  │        └─ index.ts
│  │  └─ shared
│  │     └─ components
│  │        ├─ Footer
│  │        │  ├─ Footer.module.scss
│  │        │  ├─ Footer.tsx
│  │        │  ├─ components
│  │        │  │  └─ NavigationFooter
│  │        │  │     ├─ NavigationFooter.module.scss
│  │        │  │     ├─ NavigationFooter.tsx
│  │        │  │     └─ index.ts
│  │        │  └─ index.ts
│  │        ├─ Header
│  │        │  ├─ Header.module.scss
│  │        │  ├─ Header.tsx
│  │        │  ├─ components
│  │        │  │  ├─ HeaderCartCount
│  │        │  │  │  ├─ HeaderCartCount.tsx
│  │        │  │  │  └─ index.ts
│  │        │  │  └─ HeaderFavoritesCount
│  │        │  │     ├─ HeaderFavoritesCount.tsx
│  │        │  │     └─ index.ts
│  │        │  └─ index.ts
│  │        ├─ Navigation
│  │        │  ├─ Navigation.module.scss
│  │        │  ├─ Navigation.tsx
│  │        │  └─ index.ts
│  │        └─ ProductCard
│  │           ├─ ProductCard.module.scss
│  │           ├─ ProductCard.tsx
│  │           └─ index.ts
│  ├─ styles
│  │  ├─ abstracts
│  │  │  ├─ _abstracts.scss
│  │  │  ├─ _mixins.scss
│  │  │  ├─ _placeholders.scss
│  │  │  └─ _variables.scss
│  │  ├─ base
│  │  │  ├─ _base.scss
│  │  │  ├─ _fonts.scss
│  │  │  ├─ _normalize.scss
│  │  │  └─ _typography.scss
│  │  ├─ global.scss
│  │  └─ layout
│  │     ├─ _container.scss
│  │     ├─ _layout.scss
│  │     └─ _page.scss
│  ├─ types
│  │  ├─ Cart.ts
│  │  ├─ Favorites.ts
│  │  ├─ Icon.ts
│  │  ├─ Product.ts
│  │  └─ index.ts
│  ├─ utils
│  │  ├─ api.ts
│  │  ├─ sortUtils.ts
│  │  └─ urlParamsUtils.ts
│  └─ vite-env.d.ts
├─ tsconfig.json
└─ vite.config.ts

```
