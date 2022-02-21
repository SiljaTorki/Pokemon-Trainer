import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/module/pokemon.model';
import { PokeResponse } from 'src/app/module/response.model';
import { Trainer } from 'src/app/module/trainer.model';
import { RegisterService } from 'src/app/services/register.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
    selector: 'app-trainer-item',
    templateUrl: './trainer-item.component.html',
    styleUrls: ["./trainer.item.css"]
})

export class TrainerItemComponent implements OnInit{    
    //Type of metadata for an `Input` property.
    @Input() pokemons: Pokemon[] = [];
    //Type of the Output metadata.
    @Output() deletePokemonFromTrainer: EventEmitter<Pokemon> = new EventEmitter();

    public responseObject: PokeResponse | null = null; 

    //DI - Dependency Injection
    constructor(private http: HttpClient, private registerService: RegisterService, private trainerService: TrainerService) {}
    
    //Empty Trainer object
    private _trainer: Trainer  = {id:0, username:"", pokemon:[]}

    //Empty Trainer object
    private trainer: Trainer | null = null

    //Empty pokemon object
    private poke: Pokemon = {pokemonName:'', id:0, pokemonImg:''};

    //Method that norifies the parent trainer page with information of selected pokemon trainer wants to delete
    deletePokemon(pokemon: Pokemon) {
        console.log("Pokemon removed", pokemon.id)
        this.deletePokemonFromTrainer.emit(pokemon) // Notify the parent -> trainer.page
    }

    //Button function
    clickPokemon() {
        console.log("You can delete the pokemon")
    }

    ngOnInit(): void {
        // Get trainer from local storrage
        this._trainer = this.registerService.getLocalTrainer();

        //Get all pokemons from Pokemon API
        this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=151')
        .subscribe({
            next: (response: PokeResponse) => {
                this.responseObject = response;
                for (let index in response.results) { 
                        //Get pokemon if pokemon name in API matches the pokemon name from the trainer in localstorrage
                        response.results.forEach(p => {
                            if(p.name === this._trainer.pokemon[index]) {
                                //Makes a Pokemon object for all matches
                                this.poke = this.registerService.getPokemon(p);
                                //Push Pokemon to an output array that sends metadata to DOM element
                                this.pokemons.push(this.poke);
                            }
                        })
                }
            },
            error: (error) => {
                console.error(error)
            }
        })
        
    }
}