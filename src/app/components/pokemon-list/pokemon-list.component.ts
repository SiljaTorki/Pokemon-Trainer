import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/module/pokemon.model';
import { PokeResponse } from 'src/app/module/response.model';
import { RegisterService } from 'src/app/services/register.service';

@Component({
    selector: 'app-pokemon-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ["./pokemon.list.css"]
})


export class PokemonListComponent implements OnInit{
    
    //Type of metadata for an `Input` property.
    @Input() pokemons: Pokemon[] = [];
    //Type of the Output metadata.
    @Output() addPokemonToTrainer: EventEmitter<Pokemon> = new EventEmitter();

    //Empty responseObject
    public responseObject: PokeResponse | null = null; 

    //Empty pokemon object
    private poke: Pokemon = {pokemonName:'', id:0, pokemonImg:''};

    //DI - Dependency Injection
    constructor(private http: HttpClient, private registerService: RegisterService) {}

    //Method that norifies the parent pokemon page with information of selected pokemon trainer wants to add
    addPokemon(pokemon: Pokemon) {
        this.addPokemonToTrainer.emit(pokemon) // Notify the parent -> pokemon.page
    }

    ngOnInit(): void {
        this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=151')
        .subscribe({
            next: (response: PokeResponse) => {
                this.responseObject = response;
                for (let index in response.results) {
                    //Makes a Pokemon object for evry pokemon in the API (list limited to 151)
                    this.poke = this.registerService.getPokemon(response.results[index]);
                    //Push Pokemon to an output array that sends metadata to DOM element 
                    this.pokemons.push(this.poke);
                }
            },
            error: (error) => {
                console.error(error)
            }
        })

    }
    
}