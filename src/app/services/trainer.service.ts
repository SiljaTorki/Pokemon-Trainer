import { Injectable } from "@angular/core";
import { Pokemon } from "../module/pokemon.model";
import { Trainer } from "../module/trainer.model";

const TRAINER_KEY = 'trainer-user';

@Injectable({
    providedIn: 'root',
})

export class TrainerService {
    private _username: string = '';
    private _trainer?: Trainer;

    //get username
    get username(): string {
        return this._username;
    }

    //get tariner object
    get trainer(): Trainer | undefined {
        return this._trainer;
    } 

    //Constructor
    constructor() {
        const storedTrainer: string = localStorage.getItem(TRAINER_KEY) ?? "";
        if (storedTrainer) {
            const json = JSON.parse(storedTrainer) as Trainer;
            this._trainer = json;
        }
    }
 }

