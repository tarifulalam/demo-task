import { Component, ElementRef, OnInit} from '@angular/core';
import { ApiService } from './api.service';
import { ReadJsonDto } from './readJsonDto.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    //@ViewChildren('resizeElement') resizeElement: any;
  title = 'my-app';
  mousedown_points: any;
  rectWidth: number = 100
  rectHeight: number = 100
  xElement: number = 0
  yElement: number = 0
  rect: any;
  resize: any;
  perimeter: number = 0;

    constructor(
      private elementRef: ElementRef,
      private apiService: ApiService
      ) {}

  ngOnInit(): void {
    
    this.setPerimeter();
    this.loadPerimeterData();

    this.elementRef.nativeElement.querySelector('#resize').addEventListener('mousedown', this.mousedown.bind(this), false);
  }

  mousedown(e: any) {
      var target = e.target;
      if (target.id === 'resize') {
          this.mousedown_points = {
              x: e.clientX,
              y: e.clientY
          }
          console.log('mousedown_points', this.mousedown_points);
          
          this.elementRef.nativeElement.querySelector('#resize').addEventListener('mouseup', this.mouseup.bind(this), false);
          this.elementRef.nativeElement.querySelector('#resize').addEventListener('mousemove', this.mousemove.bind(this), false);
      }
  }

  mousemove(e: any) {
    
      var current_points = {
        x: e.clientX,
        y: e.clientY
      }
      
      this.rect= this.elementRef.nativeElement.querySelector('#myrect');
      this.rectWidth=parseFloat(this.rect.getAttribute('width'));
      this.rectHeight=parseFloat(this.rect.getAttribute('height'));
      
      var dx=current_points.x-this.mousedown_points.x;
      var dy=current_points.y-this.mousedown_points.y;
      
      this.rectWidth+=dx;
      this.rectHeight+=dy;
      
      this.rect.setAttribute('width',this.rectWidth);
      this.rect.setAttribute('height',this.rectHeight);
      
      this.mousedown_points=current_points;
      
      
      this.resize= this.elementRef.nativeElement.querySelector('#resize');
      this.xElement=parseFloat(this.resize.getAttribute('x'));
      this.yElement=parseFloat(this.resize.getAttribute('y'));
      
      this.xElement+=dx;
      this.yElement+=dy;
      this.setPerimeter();
      this.resize.setAttribute('x',this.xElement);
      this.resize.setAttribute('y',this.yElement);
  }
  


  mouseup(e: any) {
      // this.elementRef.nativeElement.querySelector('#mousemovesection').removeEventListener('mouseup', this.mouseup.bind(this), false);
      // this.elementRef.nativeElement.querySelector('#mousemovesection').removeEventListener('mousemove', this.mousemove.bind(this), false);

      // this.elementRef.nativeElement.querySelector('#resize').removeEventListener('mouseup', this.mouseup.bind(this), false);
      // this.elementRef.nativeElement.querySelector('#resize').removeEventListener('mousemove', this.mousemove.bind(this), false);

      document.removeEventListener('mouseup', this.mouseup.bind(this), false);
      document.removeEventListener('mousemove', this.mousemove.bind(this), false);
      this.elementRef.nativeElement.removeEventListener('mouseup', this.mouseup.bind(this), false);
      this.elementRef.nativeElement.removeEventListener('mousemove', this.mousemove.bind(this), false);
  }

  onSave(){
    let data = new ReadJsonDto();
    data.height= this.rectHeight;
    data.width= this.rectWidth,
    data.x= this.xElement,
    data.y= this.yElement

    this.apiService
      .save(data)
      .subscribe({
        next: (response) => {
          alert('successfully saved data');
        },
        error: (error) => {
          alert('Failed to upadte: '+ error.message);
        },
      });
  }

  loadPerimeterData(){
    this.apiService.readJsonFile().subscribe({
      next: (res) => {
        console.log(res);
        this.rectHeight=res.height;
      this.rectWidth=res.width;
        this.xElement=res.x;
      this.yElement=res.y;
        this.setPerimeter();
        this.loadDimention();
      },
    });}

  loadDimention(){
    this.rect= this.elementRef.nativeElement.querySelector('#myrect');
    this.rect.setAttribute('width',this.rectWidth);
    this.rect.setAttribute('height',this.rectHeight);
    
    this.resize= this.elementRef.nativeElement.querySelector('#resize');
    this.resize.setAttribute('x',this.xElement);
    this.resize.setAttribute('y',this.yElement);

  }
  setPerimeter(){
    this.perimeter = 2 * (this.rectHeight + this.rectWidth);
  }
}
