<h1>alex studios</h1>
<p></p>Welcome to alex studios! a clothing platform </p>



 ## home.html
The HTML document defines the structure of a landing page for Alex Studios website. It starts with the inclusion of necessary meta tags for character encoding and viewport settings. The page incorporates Bootstrap framework for responsive design, including both CSS and JavaScript files. Custom fonts from Google Fonts and icons from Font Awesome are utilized throughout the page. The main content is organized into sections: a navigation bar for easy site navigation, a header section featuring the studio's branding, a main section with a call-to-action and imagery, a product section showcasing new arrivals, and a footer containing contact information and copyright details. Each section is styled with custom classes defined in an external stylesheet. The document aims to provide a visually appealing and user-friendly interface for visitors to explore Alex Studios' products and services.

createAccount.html
The HTML document is a webpage designed for user account creation on the Alex Studios website. It begins with standard meta tags for character encoding and viewport settings. The page imports Bootstrap CSS and JavaScript files from a CDN for styling and interactivity. Additionally, custom fonts from Google Fonts and icons from Font Awesome are included. The main content is organized into sections: a navigation bar for site navigation, a form section for creating a user account, and a footer section containing contact information and copyright details. The form includes fields for email, password, phone number, street address, zip code, city, and state, with validation for required fields. JavaScript functionality for form validation is referenced in an external script file named "script.js." Overall, the webpage aims to provide a user-friendly interface for visitors to create accounts with Alex Studios.

shop.html
This HTML document serves as the main webpage for Alex Studios, focusing on showcasing their collection of products. The page begins with standard meta tags and includes a favicon for the website. It imports Bootstrap CSS and JavaScript files from a CDN for styling and interactivity. Custom fonts from Google Fonts and icons from Font Awesome are also included. The main content is structured into sections: a header with the Alex Studios logo and navigation bar, followed by sections displaying product cards categorized into rows. Each product card includes an image, title, and price, linking to individual product pages. The page concludes with a footer containing contact information and copyright details. Overall, the webpage aims to provide an attractive and organized layout for users to browse and explore the Alex Studios product collection.

productPage.html
The webpage consists of a header section with a navigation bar providing links to home, shop, and account pages, along with a shopping bag icon for accessing the cart. The main content showcases a product card featuring an image, title, price, and description, with buttons for selecting product sizes and an "Add to Cart" button for adding items to the shopping cart. The footer contains contact information and copyright details. Overall, the webpage offers a user-friendly interface for browsing products and managing shopping cart items, with a clean and modern design built for responsiveness and layout consistency using Bootstrap.








Routes.js
cartRoutes.js 
This JavaScript code sets up routes for handling cart-related functionalities in an Express.js application. It begins by importing Express and creating a router object. Several controller functions are imported, including addToCart, removeFromCart, updateCartQuantity, renderCart, clearCart, and productCartAdded, which are responsible for different actions related to the shopping cart.
The router then defines HTTP endpoints for these actions using various HTTP methods such as POST and GET. For instance, addToCart handles the addition of a product to the cart when a POST request is made to the '/addProduct' endpoint. Similarly, other endpoints like '/removeProduct', '/updateProduct', '/cartContents', '/clearCartContents', and '/productAddedPage' handle removing products from the cart, updating product quantities, rendering the cart page, clearing the cart contents, and displaying a page confirming the addition of a product to the cart, respectively.

orderRoutes.js 
This JavaScript code defines routes for handling order-related functionalities in an Express.js application. It starts by importing Express and creating a router object. The router imports three controller functions: renderStoreOrder, submitOrderPage, and renderOrderPage from the '../controllers/orderController' module.
The router then sets up HTTP endpoints for these actions using various HTTP methods such as GET and POST. For instance, the '/storeOrder' endpoint, accessed via a GET request, renders the page where users can place their orders. The '/submitOrder' endpoint, accessed via a POST request, processes the submitted order. Finally, the '/orderPage' endpoint, accessed via a GET request, renders a page displaying the details of a specific order.

userRoutes.js 

This JavaScript code defines routes for user-related functionalities in an Express.js application. It starts by importing Express and creating a router object. It also imports the User model from '../models/config' and three controller functions: registerAccount, loginAccount, and logoutAccount from '../controllers/userController'.
The router then sets up HTTP endpoints for these actions using the POST method. For instance, the '/createAccount' endpoint is used to create a new user account, the '/account' endpoint is used to log in to an existing account, and the '/logout' endpoint is used to log out from the current session.
Once the routes are defined, the router is exported to be used in the main Express application. This structure helps organize the codebase by separating concerns related to user authentication and management into distinct modules.

Model.js

orderModel.js 

This JavaScript code defines a Mongoose schema for an order in a MongoDB database. The orderSchema specifies the structure of the order document, including various fields such as user information, items in the order, billing information, payment information, and the order total.
Here's a breakdown of the schema:
user: References the user who placed the order, using their ObjectId from the 'User' model.
items: An array of objects representing the items in the order. Each item contains fields for the product name, price, quantity, and size.
name: Contains the first name and last name of the user who placed the order.
billingInfo: Stores the billing address, phone number, ZIP code, city, and state for the order.
paymentInfo: Holds the credit card information, including the card number, expiry date, and CVV.
orderTotal: Represents the total cost of the order.
The schema is then compiled into a Mongoose model named 'Order' using mongoose.model(), and this model is exported for use in other parts of the application.

config.js 
This JavaScript code defines a Mongoose schema for user registration in a MongoDB database. The registerSchema specifies the structure of the user document, including various fields such as email, password, phone number, address, ZIP code, city, and state.
Here's a breakdown of the schema:
email: Represents the user's email address. It's a required field of type String with a default value of an empty string.
password: Stores the user's password. It's a required field of type String with a default value of an empty string.
phone: Stores the user's phone number. It's a required field of type Number with a default value of 0.
address: Represents the user's address. It's a required field of type String with a default value of an empty string.
zip: Stores the ZIP code of the user's address. It's a required field of type Number with a default value of 0.
city: Represents the city of the user's address. It's a required field of type String with a default value of an empty string.
state: Stores the state of the user's address. It's an optional field of type String with a default value of an empty string.
Additionally, the schema includes timestamps: true option, which automatically adds createdAt and updatedAt fields to the document to track the creation and modification timestamps.
The schema is then compiled into a Mongoose model named 'User' using mongoose.model(), and this model is exported for use in other parts of the application.

Controller.js

cartController.js 
This JavaScript code defines several functions related to managing a shopping cart in a web application using Express.js and session management. Here's a breakdown of each function:
addToCart: This function handles adding a product to the shopping cart. It extracts product details from the request body and creates a new item object with those details. It then checks if the item is already in the cart based on its ID and size. If the item is already in the cart, it increments its quantity; otherwise, it adds the item to the cart. Finally, it redirects the user to a page indicating that the product has been added to the cart.
removeFromCart: This function removes a product from the shopping cart. It retrieves the product ID from the request body and finds the index of the item in the cart. If the item is found, it removes it from the cart array and updates the session with the modified cart. It then sends a JSON response indicating whether the removal was successful.
updateCartQuantity: This function updates the quantity of a product in the shopping cart. It retrieves the product ID and the change in quantity from the request body. It finds the index of the item in the cart, updates its quantity, and ensures that the quantity is not negative. If the quantity becomes zero, the item is removed from the cart. Finally, it sends a JSON response indicating the success of the operation.
renderCart: This function renders the shopping cart page and passes the cart data to it. It retrieves the cart data from the session and renders the 'cart.ejs' template, passing the cart data to it for display.
clearCart: This function clears all products from the shopping cart. It simply sets the cart data in the session to an empty array and redirects the user back to the cart page.
productCartAdded: This function redirects the user to a page indicating that a product has been added to the cart. It retrieves the cart data from the session and renders the 'addProductCartPage.ejs' template, passing both the cart data and the recently added item to it for display.

orderController.js 
This JavaScript code defines functions related to managing orders in a web application. Here's a breakdown of each function:
renderStoreOrder: This function renders the store order page. It retrieves the user's cart and order information from the session and renders the 'storeOrder.ejs' template, passing the cart and user order data to it for display.
submitOrderPage: This function handles the submission of an order. It extracts order details from the request body, including user information, billing information, payment information, and the order total. It then creates a new order object using the Order model and saves it to the database. Finally, it redirects the user to the 'storeOrder' page.
renderOrderPage: This function renders the order page. It retrieves the user's information and cart from the session and renders the 'orders.ejs' template, passing both the user and cart data to it for display.
These functions collectively handle the process of rendering order-related pages, submitting orders, and displaying order information to users. They interact with the session to access user and cart data and use the Order model to save order information to the database.

userController.js 
This JavaScript code defines functions related to user authentication and account management in a web application. Here's a breakdown of each function:
registerAccount: This function handles the registration of a new user account. It creates a new instance of the User model with the provided user details, including email, password, phone, address, zip code, city, and state. It then performs server-side validation to ensure all required fields are provided. If the user doesn't already exist in the database, it hashes the password using bcrypt, saves the user to the database, and redirects the user to the account page. If the user already exists, it sends an alert to notify the user and redirects them to the account creation page.
loginAccount: This function handles user login. It retrieves the email and password from the request body, finds the user with the provided email in the database, and compares the hashed password with the provided password using bcrypt. If the passwords match, it sets the user's session data including id, email, phone, address, zip code, city, and state, and redirects the user to the shop page. If the user does not exist or the password does not match, it redirects the user back to the account page.
logoutAccount: This function handles user logout. It destroys the user's session and redirects them to the account creation page.
These functions collectively manage the registration, login, and logout processes for user accounts in the application. They interact with the User model to store and retrieve user information from the database and use bcrypt for password hashing and comparison.

Views ejs files 
storeOrder.ejs 
This ejs file serves as a template for displaying order confirmation details on the Alex Studios website. It features a header section with branding and navigation links. The main content area dynamically presents a personalized thank you message to the user along with an order summary, including each item's image, name, price, quantity, and size. The subtotal, tax, and total order cost are calculated and displayed accordingly. The footer section contains contact information and copyright details. Overall, this template provides a visually appealing and informative layout for confirming orders.

order.ejs 
This ejs file is designed for the checkout process on the Alex Studios website. It starts with the necessary meta tags and includes Bootstrap and font-awesome for styling. The layout includes a navigation bar with links to different sections of the website.
The main content area contains a form for users to input their address, shipping information, and payment details. It includes fields for first name, last name, phone number, street address, zip code, city, state, and checkboxes for remembering the address and selecting shipping options. Additionally, there are fields for card number, expiration date, and CVV for payment information.
Below the form, there is a section displaying the order contents, including each item's name, price, quantity, and size. The order summary shows the subtotal, tax, shipping cost, and total order amount.
JavaScript validation is implemented to ensure that all required fields are filled out correctly before submitting the form. If any field is empty or invalid, an alert message will prompt the user to correct it.
Overall, this HTML file provides a user-friendly interface for users to complete their purchases securely and efficiently on the Alex Studios website.

cart.ejs 
This ejs file is for the shopping cart page of the Alex Studios website. It starts with the necessary meta tags and includes Bootstrap and font-awesome for styling. The layout includes a navigation bar with links to different sections of the website.
The main content area contains a shopping cart display. If the cart is empty, a message is shown prompting the user to shop for items. If the cart has items, each item is listed with its image, name, price, quantity, and size. Users can increase or decrease the quantity of each item, and there's a button to remove the item from the cart.
The subtotal of the items in the cart is calculated and displayed. If there are items in the cart, a button is provided to proceed to checkout, which redirects the user to the checkout page. Additionally, there's an option to clear the cart, which removes all items from the cart.
JavaScript functions are implemented to handle actions such as removing items from the cart and updating item quantities via AJAX requests to the server. These actions dynamically update the cart display without the need for page reloads, providing a smooth user experience.

addProductCartpage.ejs 

This HTML file is for the product addition confirmation page of the Alex Studios website. It begins with the necessary meta tags and includes Bootstrap and font-awesome for styling.
The layout includes a navigation bar with links to different sections of the website, such as Home, Shop, and Account, along with a link to view the cart contents.
The main content area displays a confirmation message indicating that the product has been successfully added to the cart. It shows the image, name, price, quantity, and size of the recently added product. Below this, there are options to either continue shopping or proceed to checkout. Additionally, users can directly navigate to the cart contents page.
A carousel section is included to showcase other products, allowing users to browse through multiple product images.
At the bottom of the page, there is a footer section containing contact information and copyright details.
JavaScript code may handle dynamic interactions such as updating cart quantities and displaying product images in the carousel, but it's not provided in this HTML snippet.
