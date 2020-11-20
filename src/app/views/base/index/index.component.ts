import { Component, OnInit } from "@angular/core";
import {TranslateService} from "../../../shared/services/translate.service";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit {
  carouselList = [
    {
      bannerImg: "./assets/banner_img/img_1.jpg",
      title: "WOMEN'S FASHION ",
      description: "50% OFF",
    },
    {
      bannerImg: "./assets/banner_img/img_3.jpg",
      title: "ALL BRANDED WOMEN'S BAGS ARE FLAT 30% DISCOUNT",
      description:
        " Visit our shop to see amazing creations from our designers",
    },
    {
      bannerImg: "./assets/banner_img/img_4.jpg",
      title: "My fashion Wear",
      description: "Twonderful designs has akenpossession of loremquis nostrum exercitation is simply dummy text ",
    },
  ];
  constructor(
    public translate: TranslateService,
             ) {}

  ngOnInit() {}

}
