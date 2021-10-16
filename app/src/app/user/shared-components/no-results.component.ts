import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-results',
  template: `
    <div class="callout callout-danger mt-5 text-center">
      <h5 style="font-size:1.3rem;">Importante!</h5>

      <p style="font-size:1.5rem; color:#7A7C7A">
        No se encontraron resultados.
      </p>
    </div>
  `,
  styles: [],
})
export class NoResultsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
