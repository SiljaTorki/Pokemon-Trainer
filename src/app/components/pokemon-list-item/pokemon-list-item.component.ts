import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/module/pokemon.model';


@Component({
    selector: 'app-pokemon-list-item',
    templateUrl: './pokemon-list-item.component.html',
    styleUrls: ["./pokemon.item.css"]
})

export class PokemonListItemComponent implements OnInit {
    //Type of metadata for an `Input` property.
    @Input() pokemon!: Pokemon;

    private isAdded : boolean = false; 

    //DI _ Dependency Injection
    constructor() { }

    ngOnInit(): void {
    }

    //Register clicked pokemon
    public clickPokemon(){
        console.log("You can add the new pokemon")
        this.isAdded = true;
    }

    public pokemonClicked(): boolean {
        return this.isAdded
    }

}
  