import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlackjackService } from '../../Service/blackjack.service';
import { Card } from '../../Models/Card';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  playerHand: Card[] = [];
  dealerHand: Card[] = [];
  betValue: number = 0;

  constructor(private blackjackService: BlackjackService) {}

  handleStartGame(): void {
    this.blackjackService.startGame(this.betValue).subscribe({
      next: (res: any) => {
        this.playerHand = res.player.handOfCards;
        this.dealerHand = res.dealer.handOfCards;
        console.log(res.dealer.handOfCards, res.player.handOfCards);
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }

  handleHit(): void {
    this.blackjackService.Hit().subscribe({
      next: (res: any) => {
        this.playerHand = res.player.handOfCards;
        console.log(res);
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }
}

//What are the files named? If it's like 10D.jpg for 10 of diamonds, QH.jpg for queen of hearts, you could just make a function that turns it into the right filename..

//const cardImage = (card) => `/images/${card}.jpg`

//<img [src]="this.cardURL"/>
//[cardURL]="'./assets/cards/' + userCard + '.png'"
