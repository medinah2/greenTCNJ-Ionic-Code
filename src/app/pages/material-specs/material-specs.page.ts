import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-material-specs',
  templateUrl: './material-specs.page.html',
  styleUrls: ['./material-specs.page.scss'],
})

export class MaterialSpecsPage {

  materialObj: any;

  // holds material information to be displayed on the page
  materialResult: {name: any, type: any, description: any, image: any}[] = [];

 // this is used to read in the material id from the previous page
  constructor(public http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.materialObj = this.router.getCurrentNavigation().extras.state.searchResults;
        }
    });
    this.loadMaterial();
  }
  

    loadMaterial(){
      // set material_id to the value of the passed material ID based on what was pressed
      this.materialObj = this.router.getCurrentNavigation().extras.state.searchResults
      
      // if there is no image path set the image path to display not-found.jpg image
      var imgPath = "https://recycle.hpc.tcnj.edu/materialImages/not-found.jpg";

      if(this.materialObj["image_path"] !== null && this.materialObj["image_path"] !== "null"){
        
        // else, there is a valid image path so you must concatinate the image name to the full image path
        var str1 = new String('https://recycle.hpc.tcnj.edu/materialImages/'); // db image url
        var str2 = this.materialObj["image_path"]; // image name 
        var imgPath = str1.concat(str2.toString()); //combine the path with the image name 
      }

      this.materialResult.push({name: this.materialObj["material_name"], type: this.materialObj["material_type"], 
        description: this.materialObj["material_description"], image: imgPath });

      // Let database know a material was viewed
      var obj = {func: "material_viewed"};

      this.http.post("https://recycle.hpc.tcnj.edu/php/materials-handler.php", JSON.stringify(obj)).subscribe(data => {});
    }
    
}
