import { Component } from "@angular/core";

@Component({
  selector: "app-landing",
  templateUrl: "landing.page.html",
  styleUrls: ["landing.page.scss"],
})
export class LandingPage {
  profesor = {
    nombre: sessionStorage.getItem("nombre"),
  };
  constructor() {}
}
