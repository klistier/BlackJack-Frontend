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
export class GameComponent {
  canBet: boolean = true;
  playerHand: Card[] = [];
  dealerHand: Card[] = [];
  betValue: number = 0;
  playerCurrency: number = 0;
  playerHandValue = 0;
  dealerHandValue = 0;
  isGameOver: boolean = false;
  isGameTied: boolean = false;
  winner: string = '';

  constructor(private blackjackService: BlackjackService) {}
  ngOnInit(): void {
    this.handleGetGame();
  }

  handleGetGame(): void {
    this.blackjackService.GetGame().subscribe({
      next: (res: any) => {
        this.playerCurrency = res.player.currency;
      },
    });
  }

  handleStartGame(): void {
    this.canBet = false;
    this.blackjackService.StartGame(this.betValue).subscribe({
      next: (res: any) => {
        this.playerHand = res.player.handOfCards;
        this.dealerHand = res.dealer.handOfCards;
        this.isGameOver = res.isGameOver;
        this.playerCurrency = res.player.currency;
        this.dealerHandValue = res.dealer.handValue;
        this.playerHandValue = res.player.handValue;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleHit(): void {
    this.blackjackService.Hit().subscribe({
      next: (res: any) => {
        this.handleEndGame();
        this.playerHand = res.player.handOfCards;
        this.isGameOver = res.isGameOver;
        this.winner = res.winner;
        this.dealerHandValue = res.dealer.handValue;
        this.playerHandValue = res.player.handValue;
        this.isGameTied = res.isATie;
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
        this.handleEndGame();
        this.dealerHand = res.dealer.handOfCards;
        this.isGameOver = res.isGameOver;
        this.winner = res.winner;
        this.isGameTied = res.isATie;
        this.dealerHandValue = res.dealer.handValue;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleEndGame(): void {
    this.blackjackService.EndGame(this.betValue).subscribe({
      next: (res) => {
        this.playerCurrency = res.player.currency;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  playAgain(): void {
    this.canBet = true;
  }
}
