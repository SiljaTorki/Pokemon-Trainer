import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginPage } from "./pages/login/login.page";
import { PokemonPage } from "./pages/pokemon/pokemon.page";
import { TrainerPage } from "./pages/trainer/trainer.page";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login'
    },
    {
        path: 'login',
        component: LoginPage,
    },
     {
        path: 'trainer',
        component: TrainerPage,
        canActivate: [AuthGuard]
    },
    {
        path: 'pokemons',
        component: PokemonPage,
        canActivate: [AuthGuard]
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule {}