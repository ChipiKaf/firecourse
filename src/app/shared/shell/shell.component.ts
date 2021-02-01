import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
  .pipe( // pipe means we're about to make changes to the values in the stream of the observable
    map(result => result.matches), // If first argument is the map function, then we want  to perform a certain change to all the values in the stream
    shareReplay() // ShareReplay means if a new subscriber comes in after a next value has already been received, the new subscriber will also get the last emitted value upon subscription
  )
  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }

}
