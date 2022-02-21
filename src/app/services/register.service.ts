import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, of, switchMap } from "rxjs";
import { Trainer } from "../module/trainer.model";
import { Pokemon } from "../module/pokemon.model";

@Injectable ({
    providedIn: 'root',
})

export class RegisterService {

    //Get Api from enviorments
    private  API_URL: string = environment.trainerAPI;

    //Empty Trainer object
    private _trainer: Trainer  = {id:0, username:"", pokemon:[]}
   
    //Empty Pokemon array
    private _pokemons: Pokemon[] = []

    //Empty error message 
    public registerError: string = ""   

    //DI - Dependency Injection
    constructor(private http: HttpClient) {}

    //Header
    private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': 'K48l1LQApkyUkXs52Lbb2Q',
    });
  }

  // Function to register new user 
  registerTrainer(username: string): Observable<Trainer>{
    //Create header with API_KEY
    const headers = this.createHeaders();
    //Create new user
    const trainer = {username, pokemon:[] }
    // return POST request
    return this.http.post<Trainer>(this.API_URL, trainer, {headers})
  }
  
  //Get a trainer array with username 
  getTrainer(username: String): Observable<Trainer[]> {
      console.log(`${this.API_URL}?username=${username}`)
      //GET request
      return this.http.get<Trainer[]>(`${this.API_URL}?username=${username}`)
  }

  //Register trainer with username given by user on login page
  register(username: string, onSuccess: () => void): void{
    this.getTrainer(username)
    .pipe( 
      // switch to another observable after complete the others complete
      switchMap((trainer: Trainer[]) => {
        //check the length of trainer array
        if(trainer.length) {
           return of(trainer[0])
        }
          //register trainer with username 
          return this.registerTrainer(username);
      })


    ).subscribe({
        next: (trainer: Trainer) => {
          if(trainer) {
                //set new trainer
                this._trainer = trainer;
                // Store trainer local
                localStorage.setItem('trainer-user', JSON.stringify(this._trainer))
                //Successfull -> redirect to next page
                onSuccess();
          }    
        },
        //Handle error
        error: (error: HttpErrorResponse) => {
            this.registerError = error.message;
        }
    })
  }

  //Method that gets trainer info from local storrage
  getLocalTrainer() : Trainer {
    const storedTrainer: string = localStorage.getItem('trainer-user') ?? "";
    //If trainer found in local storrage
    if (storedTrainer) {
      //Parse to JSON
      const json = JSON.parse(storedTrainer) as Trainer;
      //Set trainer to trainer found in local storrage
      this._trainer = json;
    }

    //Return trainer from local
    return this._trainer;
  }

  // Method that gets the pokemon information from the pokemon api, pushes the pokemon info to the pokeList as an object
  getPokemon = (info: any): Pokemon => {
    //Empty pokemon object
    let poke: Pokemon = {pokemonName:'', id:0, pokemonImg:''};
    //Set name to Pokemon
    poke.pokemonName = info.name;
    //Set id to Pokemon
    poke.id = parseInt(info.url.slice(34,-1));
    //Set utl to Pokemon img
    poke.pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`;

    //Return Pokemon object
    return poke;
  }

  public addPokemon(username: string, pokemonName: string): void {
      this.getTrainer(username).subscribe((response)=>{
        // Get trainer from local storrage
        this._trainer = this.getLocalTrainer();

        //Sets pokemol list with pokemonlist from localstorage
        this._pokemons = this._trainer.pokemon;
        
        //Store colected pokemon
        let pokemon: any = pokemonName;

        //Add new pokemon to trainer
        this._pokemons.push(pokemon)

        //Update local storrage for user
        localStorage.setItem('trainer-user', JSON.stringify(this._trainer))

        //Stroe pokemons in session
        sessionStorage.setItem('pokemons', JSON.stringify(this._pokemons))
      })
  }
  public deletePokemon(username: string, pokemonName: string): void {
    this.getTrainer(username).subscribe((response)=>{
      // Get trainer from local storrage
      this._trainer = this.getLocalTrainer();
      let pokemon: any = pokemonName;

      //Sets pokemon list with pokemonlist from localstorage
      this._pokemons = this._trainer.pokemon;

      //Check all pokemons in pokemon list from local
      for(let i = 0; i < this._pokemons.length; i++) {
        //If match, remove pokemon from list
        if(this._pokemons[i] === pokemon) {
          //Removes pokemon from an array and inserts another pokemon in their place
          this._pokemons.splice(i, 1);
        }
      }
      //Update local storrage
      localStorage.setItem('trainer-user', JSON.stringify(this._trainer))
      //Stroe pokemons in session
      sessionStorage.setItem('pokemons', JSON.stringify(this._pokemons))

      //Update view
      window.location.reload();
    })
  } 
}


