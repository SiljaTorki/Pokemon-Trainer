import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { TrainerService } from "src/app/services/trainer.service";
import { RegisterService } from "src/app/services/register.service";


@Component({
    selector: "app-login",
    templateUrl: "./login.page.html",
    styleUrls: ["./login.page.css"]
})

export class LoginPage implements OnInit{

    registerError: string = ""   

    constructor(
        private router: Router,
        private registerService : RegisterService) { }
        

    ngOnInit(): void {}

    onLoginSubmit(form: NgForm): void {
        //check trainer username
        const { username } = form.value;
        //If username is empty, register errormessage to Dom-elemet
        if(!username) {
            this.registerError = "You must have a Trainer name!"
        } else if (username.length < 2) { //Else if username is too short, register errormessage to Dom-elemet
            this.registerError = "Requierd min length for Trainer name is 2!"
        } else { //Register new Trainer
            this.registerService.register(username, ( ) => this.router.navigateByUrl("/pokemons"));
        }
        
    }
}