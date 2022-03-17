import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChildren } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
    //@ViewChildren('resizeElement') resizeElement: any;
  title = 'my-app';
  mousedown_points: any;
  wElement: any;
  hElement: any;
  xElement: any;
  yElement: any;
  rect: any;
  resize: any
  flag: boolean = false


  htmlElement: any;
  mousemove$: any;
mouseup$: any;

ismousedown= false;

    constructor(private elementRef: ElementRef) {

    }

ngAfterViewInit(): void {
}

  ngOnInit(): void {
    //  if(!this.ismousedown){
         
    //   document.getElementById('mousemovesection')?.removeEventListener('mousemove', this.onMousemove.bind(this), false);
    //   document.getElementById('resize')?.removeEventListener('mousemove', this.onMousemove.bind(this), false);
    //  }
    this.elementRef.nativeElement.querySelector('#resize').addEventListener('mousedown', this.mousedown.bind(this));

  }

  mousedown(e: any) {
      this.ismousedown =true;
    console.log('call mosue down');
    // debugger;
    var target = e.target;
    console.log('target', target.id);

    if (target.id === 'resize') {
      this.mousedown_points = {
        x: e.clientX,
        y: e.clientY
      }
    //   document.addEventListener('mouseup', (e) => {
    //     e.preventDefault();
    //     console.log('call from mouse up');
    //     this.onMouseup;
    //     document.addEventListener('mousemove', this.onMousemove);
    //   })
    //   document.addEventListener('mousemove', (e) => {
    //       console.log('call from mouse move');
          
    //     e.preventDefault();
    //     // this.onMouseup(event);
    //     this.onMousemove;
    // if (!this.ismousedown){
    //     this.elementRef.nativeElement.querySelector('#resize').addEventListener('mousemove', this.onMousemove.bind(this));
    //     this.ismousedown = true;
    // }
      this.elementRef.nativeElement.querySelector('#mousemovesection').addEventListener('mousemove', this.onMousemove.bind(this));
      // this.elementRef.nativeElement.querySelector('#mousemovesection').addEventListener('mouseup', this.onMouseup.bind(this));
      

    // this.elementRef.nativeElement.querySelector('#resize').removeEventListener('mouseup', this.onMouseup.bind(this), false);
    // this.elementRef.nativeElement.querySelector('#resize').removeEventListener('mousedown', this.mousedown.bind(this), false);

    //   })
    //   let htmlElement = document.getElementById('resize') as HTMLElement;
    //   htmlElement?.addEventListener('mouseup', this.onMouseup, false);
    //   htmlElement?.addEventListener('mousemove', this.onMousemove, false);
    // this.htmlElement = document.getElementById('resize') as HTMLElement;
    //     this.mousemove$ = fromEvent(this.htmlElement, 'mousemove');
    //     this.mouseup$ = fromEvent(this.htmlElement, 'mouseup');
    //     this.mouseup$.subscribe(() => {
    //       this.onMouseup(e);
    //     })
    //     this.mousemove$.subscribe(() => {
    //       this.onMousemove;
    //     });
        
// const draggableElement = document.getElementById('dragMe');

// const mouseDown$ = fromEvent(docum, 'mousedown');
// const mouseMove$ = fromEvent(this.onMousemove, 'mousemove');
// const mouseUp$ = fromEvent(draggableElement, 'mouseup');
    }
  }

  onClick(event: any) {
      // document.getElementById('mousemovesection')?.removeEventListener('mousemove', this.onMousemove.bind(this), false);
      // this.elementRef.nativeElement.querySelector('mousemovesection')?.removeEventListener('mousemove', false);
      console.log('stop clicked');
      
    // document.getElementById('mousemovesection')?.removeEventListener('mouseup', this.onMouseup, false);
    // document.getElementById('mousemovesection')?.removeEventListener('mousemove', this.onMousemove, false);

    this.elementRef.nativeElement.querySelector('#mousemovesection').removeEventListener('mousemove', this.onMousemove.bind(this));
    document.getElementById('mousemovesection')?.removeEventListener('mouseup', this.onMouseup.bind(this), true);
    document.getElementById('mousemovesection')?.removeEventListener('mousemove', this.onMousemove.bind(this), true);

      event.stopPropagation();
    event.preventDefault();
    return false;
    // this.elementRef.nativeElement.querySelector('#mousemovesection').removeEventListener('mousemove', this.onMousemove.bind(this), false);
    
    // this.elementRef.nativeElement.querySelector('#resize').removeEventListener('mousemove', this.onMousemove.bind(this));
    // this.elementRef.nativeElement.querySelector('#myrect').removeEventListener('mousemove', this.onMousemove.bind(this));
    // this.elementRef.nativeElement.querySelector('#resize').removeEventListener('mouseup', this.onMouseup.bind(this));
  }

  // @HostListener('mousemove', ['$event'])
  onMousemove(e : any) {
   console.log('call mousemove', e.srcElement);
    
    var target = e.target;
    if (target.id === 'resize') {
    var current_points = {
      x: e.clientX,
      y: e.clientY
    }

    this.rect = document.getElementById('myrect');
    //console.log('this.rect', this.rect);
    
    this.wElement = parseFloat(this.rect.getAttribute('width'));
    this.hElement = parseFloat(this.rect.getAttribute('height'));
    //console.log('mousedown_points', this.mousedown_points);

    if (this.mousedown_points?.x && this.mousedown_points?.y) {
      var dx = current_points.x - this.mousedown_points.x;
      var dy = current_points.y - this.mousedown_points.y;

      this.wElement += dx;
      this.hElement += dy;

      this.rect.setAttribute('width', this.wElement);
      this.rect.setAttribute('height', this.hElement);

      this.mousedown_points = current_points;


      
   // console.log('call updateResizeIcon');
    this.resize = document.getElementById('resize');
    this.xElement = parseFloat(this.resize.getAttribute('x'));
    this.yElement = parseFloat(this.resize.getAttribute('y'));

    this.xElement += dx;
    this.yElement += dy;

    this.resize.setAttribute('x', this.xElement);
    this.resize.setAttribute('y', this.yElement);


    }
    }
  }

  onMouseup(e: any) {
    console.log('call mouseup', e);
    // this.htmlElement.removeEventListener('mouseup', this.onMouseup, false);
    // this.htmlElement.removeEventListener('mousemove', this.onMousemove, false);
    // if (this.ismousedown)
    //     this.elementRef.nativeElement.querySelector('#resize').removeEventListener('mousemove', this.onMousemove.bind(this));
    //     this.elementRef.nativeElement.querySelector('#myrect').removeEventListener('mousemove', this.onMousemove.bind(this));
    // this.elementRef.nativeElement.querySelector('#mousemovesection').removeEventListener('mousemove', this.onMousemove.bind(this), false);
    // this.elementRef.nativeElement.querySelector('#mousemovesection').removeEventListener('mousemove', this.onMousemove.bind(this), false);
    document.getElementById('mousemovesection')?.removeEventListener('mouseup', this.onMouseup.bind(this), true);
    document.getElementById('mousemovesection')?.removeEventListener('mousemove', this.onMousemove.bind(this), true);

    
    e.stopPropagation();
    e.preventDefault()
  }
}
