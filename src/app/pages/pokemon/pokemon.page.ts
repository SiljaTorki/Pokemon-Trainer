import { Component, Inject, OnInit, ReflectiveInjector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Pokemon } from "src/app/module/pokemon.model";
import { RegisterService } from "src/app/services/register.service";
import { Trainer } from "src/app/module/trainer.model";
import { TrainerService } from "src/app/services/trainer.service";
import { Router } from "@angular/router";


@Component({
    selector: "app-pokemon-page",
    templateUrl: "./pokemon.page.html",
    styleUrls: ["./pokemon.page.css"]
})

export class PokemonPage implements OnInit {
    //DI
    constructor(
        private router: Router,
        private trainerService: TrainerService,
        private registerService: RegisterService
    ){ }

    public trainer: Trainer | null = null;
    
    ngOnInit() { 
        //Get trainer
        this.trainer = this.trainerService.trainer || null;
    }

    //Method to add pokemon to trainer
    addPokemonToTrainer(pokemon: Pokemon) {
        console.log("Added to trainer:", pokemon.pokemonName)
        //If there exist a trainer, add selected pokemon
        if(this.trainer) {
            //Add pokemon to trainer
            this.registerService.addPokemon(this.trainer.username, pokemon.pokemonName);
        }
    }

    logout() {
        if(this.trainer) {
            //Clear local storage
            localStorage.clear();
            //Route back to login
            this.router.navigateByUrl("/login")
        }
    }
    
}

