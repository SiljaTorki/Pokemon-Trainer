# Pokémon Trainer Application
This project was generated with Angular CLI version 13.2.2. 

## Heroku URL

Unfortunately we did not have the time to set up the heroku app. 

## Installation

    git@gitlab.com:assignment-angular-team-3/pokemon_trainer.git
    cd pokemon_trainer
    npm install 
    ng serve
    
[Navigate to application](http://localhost:4200/) -> http://localhost:4200/

## Description

The application allows a user to collect Pokémon received from the Pokémon Catalogue. 
To enter the Pokémon Catalogu, users must enter username before being ble to collect any Pokémon.

### Login Page
- Input-field for user to enter Trainer name.
- Trainer name is requierd and must have length longer than 2.
- The button savse a new user and redirected to the main page, the Pokémon Catalogue page. 

![LoginPage](/img/LogIn.PNG)

### Pokémon Catalogue page
- The user can only see this page if the user exists in localStorage. 
- Guard Servise is used to authorize the Trainer and give access to the site if existig in localStorage, if not redirect a user back to the Login Page.
- Pokémon Catalogue page list all the Pokémons with name and avatar.
- All Pokemon has a “Throw pokeball!” button that, when clicked, adds the Pokémon to the trainer’s collection.

![PokemonPage](/img/Pokemon.PNG)

### Trainer Page
- The user can only see this page if the user exists in localStorage. 
- Guard Servise is used to authorize the Trainer and give access to the site if existig in localStorage, if not redirect a user back to the Login Page.
- Trainer Page list the Pokémon that the trainer has collected with name and avatar.
- The user are also able to remove a Pokémon from their collection from the Trainer page when “Set pokemon free!”

![TrainerPage](/img/Trainer.PNG)

## Maintainers

Amalie Espeseth - @amalie.e

Silja Stubhaug Torkildsen - @SiljaTorki

We worked mostly through CodeTogether, an extension for VSCode that lets two people work on the same project at the same time. 


## Project status

Almost complete! The requierd part of the assigment works. 

Changes/upgrades to add:
- Make it possible to browse to Pokémon Catalogue Page with “next” and “previous” buttons
- Add  details section to each Pokémon that is ONLY shown when a “Show more info” button is clicked
- Improve CSS

