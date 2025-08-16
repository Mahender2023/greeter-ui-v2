import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 public name: string = '';

  // This property will store the message we get back from the server.
  public greetingMessage: string = '';

  // The URL for our V2 backend API, running locally.
  private readonly apiUrl = 'http://localhost:8080/api/greet';

  // The constructor injects the HttpClient service so we can use it.
  constructor(private http: HttpClient) {}

  // This method is called when the user clicks the "Get Greeting" button.
  public getGreeting(): void {
    // Use a default name if the input is empty.
    const nameToSend = this.name.trim() || 'World';

    // Make the API call.
    this.http.get<{ message: string }>(`${this.apiUrl}?name=${nameToSend}`)
      .subscribe(response => {
        // This code runs when the server sends back a successful response.
        this.greetingMessage = response.message;
      });
  }
}