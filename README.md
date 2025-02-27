# Bitcoin Ticker

This is a simple Bitcoin price ticker built using Next.js. It fetches real-time Bitcoin price data from the CoinGecko API and displays key financial metrics.

## Features
- Displays the latest Bitcoin price in USD
- Shows 24-hour percentage change in price
- Fetches Market Cap, Volume, and Circulating Supply
- Auto-refreshes data every 15 seconds
- Manual refresh button for on-demand updates
- Displays the last updated timestamp
- Responsive and modern UI using Tailwind CSS

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/sarthik99/bitcoin-ticker.git
   ```
2. Navigate to the project folder:
   ```bash
   cd bitcoin-ticker
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## API Source
This project uses the [CoinGecko API](https://www.coingecko.com/en/api) to fetch Bitcoin price data.

## Usage
- Open `http://localhost:3000` in your browser.
- View real-time Bitcoin price and financial metrics.
- Click the **Refresh** button to manually update the price.

## Technologies Used
- **Next.js** – React framework for server-side rendering
- **Tailwind CSS** – Styling framework
- **CoinGecko API** – Provides real-time Bitcoin data

## License
This project is open-source and available under the [MIT License](LICENSE).
