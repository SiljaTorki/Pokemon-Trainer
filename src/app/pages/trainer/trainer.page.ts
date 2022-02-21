import { Component, OnInit} from "@angular/core";
import { Trainer } from "src/app/module/trainer.model";
import { RegisterService } from "src/app/services/register.service";
import { TrainerService } from "src/app/services/trainer.service";
import { Router } from "@angular/router";
import { PokeResponse } from "src/app/module/response.model";
import { Pokemon } from "src/app/module/pokemon.model";

@Component({
    selector: "app-trainer-page",
    templateUrl: "./trainer.page.html",
    styleUrls: ["./trainer.page.css"]
})

export class TrainerPage implements OnInit {
    
    public trainer: Trainer | null = null;

    //DI _ Dependency Injection
    constructor(private router: Router, private trainerService: TrainerService, private registerService: RegisterService ) {}
    
    ngOnInit() {
      //Get trainer
      this.trainer = this.trainerService.trainer || null;
    }

    //Method for deleting Pokemon from trainer
    deletePokemonFromTrainer(pokemon: Pokemon) {
      
      //If there is a trainer, delete selected pocemon
      if(this.trainer) {
          //Delete pokemon from trainer
          this.registerService.deletePokemon(this.trainer.username, pokemon.pokemonName);
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