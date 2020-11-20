import { Component, OnInit } from "@angular/core";
import {TranslateService} from "../../../../shared/services/translate.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  constructor(public translate: TranslateService) {}

  ngOnInit() {}
}
