import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlackjackService } from '../../service/blackjack.service';
import { Card } from '../../models/Card';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {
  playerHand: Card[] = [];
  dealerHand: Card[] = [];
  betValue: number = 0;
  playerHandValue = 0;
  dealerHandValue = 0;
  isGameOver: boolean = false;
  winner: string = '';

  constructor(private blackjackService: BlackjackService) {}
  ngOnInit(): void {
    this.handleStartGame();
  }

  handleStartGame(): void {
    this.blackjackService.startGame(this.betValue).subscribe({
      next: (res: any) => {
        this.playerHand = res.player.handOfCards;
        this.dealerHand = res.dealer.handOfCards;
        this.isGameOver = res.isGameOver;
        this.dealerHandValue = res.dealer.handValue;
        this.playerHandValue = res.player.handValue;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleHit(): void {
    this.blackjackService.Hit().subscribe({
      next: (res: any) => {
        this.playerHand = res.player.handOfCards;
        this.isGameOver = res.isGameOver;
        this.winner = res.winner;
        this.dealerHandValue = res.dealer.handValue;
        this.playerHandValue = res.player.handValue;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleStand(): void {
    this.blackjackService.Stand().subscribe({
      next: (res) => {
        this.dealerHand = res.dealer.handOfCards;
        this.isGameOver = res.isGameOver;
        this.winner = res.winner;
        this.dealerHandValue = res.dealer.handValue;
        console.log(res.winner, res.isGameOver, res.dealer.handValue);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
