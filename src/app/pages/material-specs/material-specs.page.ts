import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-material-specs',
  templateUrl: './material-specs.page.html',
  styleUrls: ['./material-specs.page.scss'],
})

export class MaterialSpecsPage {

  // holds material id
  dataID : number = 0;
  // holds material information to be displayed on the page
  materialResult: {name: any, type: any, description: any, resources: any, image: any}[] = [];

 // this is used to read in the material id from the previous page
  constructor(public http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.dataID = this.router.getCurrentNavigation().extras.state.searchResults;
          console.log("Data ID: " + this.dataID); // debug print statement
        }
    });
    this.loadMaterial();
  }
  

    loadMaterial(){
      // set material_id to the value of the passed material ID based on what was pressed
      var matID = this.router.getCurrentNavigation().extras.state.searchResults;

      var obj = {func: "load_material_page", material_id: matID};
      
      console.log("inside specific material page"); // debug print statement
      
      this.http.post("https://recycle.hpc.tcnj.edu/php/materials-handler.php", JSON.stringify(obj)).subscribe(data => {
          // stores materialResult values
          var result = data as any[];

          // if there is no image path set the image path to display not-found.jpg image
          if(result["image_path"] === null || result["image_path"] === "null"){
            this.materialResult.push({name: result["material_name"], type: result["material_type"], description: result["material_description"], resources: result["resources"], image: "https://recycle.hpc.tcnj.edu/materialImages/not-found.jpg" });
          }else{
            // else, there is a valid image path so you must concatinate the image name to the full image path
            var str1 = new String('https://recycle.hpc.tcnj.edu/materialImages/'); // db image url
            var str2 = result["image_path"]; // image name 
            var imgPath = str1.concat(str2.toString()); //combine the path with the image name 
            this.materialResult.push({name: result["material_name"], type: result["material_type"], description: result["material_description"], resources: result["resources"], image: imgPath });
          }
          
      });

      var obj2 = {func: "material_viewed"};

      this.http.post("https://recycle.hpc.tcnj.edu/php/materials-handler.php", JSON.stringify(obj2)).subscribe(data => {});
    }
    
}
