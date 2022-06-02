import { transition, animate, keyframes, trigger, style } from '@angular/animations';

export const buzzAnimation = trigger('buzzAnimation', [
  transition('false => true', [
    animate('0.3s', keyframes([
      style({'padding-left': '0px', 'padding-right': '0px', offset: 0}),
      style({'padding-right': '20px', 'padding-left': '0px', offset: 0.13}),
      style({'padding-left': '20px', 'padding-right': '0px', offset: 0.39}),
      style({'padding-right': '20px', 'padding-left': '0px', offset: 0.65}),
      style({'padding-left': '20px', 'padding-right': '0px', offset: 0.91}),
      style({'padding-left': '0px', 'padding-right': '0px', offset: 1.0})
    ])),
  ])
]);
