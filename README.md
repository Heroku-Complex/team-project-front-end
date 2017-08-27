# Fencer - The one stop shop for galactic goods!

#### FOR STRIPE PAYMENT FUNCTIONALITY TESTING USE:

      VISA CARD #: 4242 4242 4242 4242      EXP: 10/20      CVC: 123

This is a e-commerce site project.  The goals for the project are to create a site where you can place orders, use the payment service Stipe to process payemnts, and see a list of past orders. Our theme for this project site are itmes you could by if you were a character in a sci-fi universe.

The depolyed site can be found at: https://heroku-complex.github.io/team-project-front-end/

The backend repository can be found at: https://github.com/Heroku-Complex/team-project-front-end

The deployed back end cand be found at: https://mudabish.herokuapp.com/


### PLANNING:
We started the project by creating user stories for what our site should do:

As a user, I would like to:

    * see what products are available.
    * be able to compile the products I would like to purchase.
    * see a subtotal of my complied purchases.
    * be able to securely pay with a credit or debit card.
    * be able to see past orders.

Next we sketched out some rough wireframes of how we wanted our site to be laid out:
https://drive.google.com/open?id=0BxljZc10IXeSNDRKbTZ5Yk5CTkZHVGVyTEN6X3dCZXRMeWVn
https://drive.google.com/open?id=0BxljZc10IXeScHQ3eWE0cjZrMl9jOGp1a0tuVTA1SjdidlZJ

The next part of the planning stage was mapping out our ERDs for our Mongodb collections and defining our schema:
https://drive.google.com/open?id=0BxljZc10IXeSLThEZnFQU3RKQmp5d1h3RHBVaVlZWWZXaDlR
https://drive.google.com/open?id=0BxljZc10IXeSSWJwMlBEZEoxc0VMVV9zMVp2aXJRWFRKMHgw

Our last step for the planning phase was discussing roles and goals for the sprint.  We discussed the steps that needed to be done and made plans to meet twice a day to discuss our progress and next steps.

### WORKFLOW:
We divided tasks and started work on back end and front end repositories to help avoid team members working in the same files.  We worked to get minimum frameworks of code in each so that we could have code to work with in both places to start testing code.

Once we had starter code, a pair of us started working on implementing Stripe payment system into our site.  Despite really good docs, this was one of the most challenging aspects of the project.  There are many ways to use Stripe and it was difficult for us to find a cohesive flow of code.  In addition, Stripe first sends a token before the POST request that needs to be included in the POST request.  The Dashboard function of the site is amazing and there is very, very little that needs to be done to set up your account there.

Stripe has a test mode for development.  It uses test keys for creating tokens and POSTing test charges which show up in a separate log in Stripe's Dashboard during development.  When the site is ready to go live for real payment's, the test keys are simply swapped out for live keys.  The deployed Fencer site stays in test mode and no real credit card data is entered.  When testing this site you can use this fake VISA card number:

                  4242 4242 4242 4242

  In addition, enter a future expiration date and a 3 or 4 digit CVC code of your choice.

Managing pull requests and merges was another challenge we faced.  Despite our careful planning we still encountered conflicts.  We found the manage conflicts feature very helpful in getting us sorted out.  In the final stages of the project we all worked from one computer to minimize creating new bugs when fixing old ones.

### ADMIN

The admin abilities is a status created on the backend but allows the user to access certain menues unavailable to other users. This will allow the user to edit, create, or delete products as nescessary that the user has ownership of. This is, infact, giving a user the ability to sell products through our shop.

An admin with this ability will not be able to touch other products that other
admins create, but still display their wears and allow for purchase. The user stories are as follows:

As a admin user, I would like to be able to:
    * Create products with that fit the requirements of the product schema.
    * Be able to disable the products that I sell without deleting them.
    * Be able to delete my items off the database. (This one I would not actually include normally, but as the story behind Fencer is that we are selling 'acquired goods', a full delete is viable though not recommended).
    * If a user purchased a deleted item, I want it to display something else in line with the story of Fencer.
    * I want to be able to update my items in and see the effects of the update in real time.
    * I want to see my creations uploaded in realtime.
    * I do want to be able to see all my current products and be able to discern if my product is active or currently disabled.

The wireframe for the admin menus are in the links below:
  Main data table:https://goo.gl/photos/S6zNCtRkAexzF7GS6
  Modals:https://goo.gl/photos/kZBjqYKqyr6knqfd6

As an admin, you can select an item and set it to inactive inside of the edit modal. Saving it in that status will then disable that item from any users products page, as well as boot it from their carts. Deleting a product will have the same affect.
