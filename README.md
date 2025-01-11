# KoinX Backend

## Description

KoinX Backend is a Node.js application that fetches and stores cryptocurrency data from CoinGecko, and provides APIs for retrieving statistics and calculating price deviations. It supports Bitcoin, Ethereum, and Matic Network cryptocurrencies, with data available in both USD and INR.

## Features

- Fetches cryptocurrency data every 2 hours
- Stores data in MongoDB
- Provides API endpoints for latest statistics and price deviation calculations
- Supports both USD and INR currencies

## Prerequisites

- Node.js (v14 or later)
- MongoDB

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/koinx-backend.git
   cd koinx-backend
   ```

2. Install dependencies:
   ```
   yarn install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   PORT=3000
   MONGODB_URI=your_mongo_db_url
   COINGECKO_API_KEY=your_coingecko_api_key_here
   ```

   Replace `your_coingecko_api_key_here` with your actual CoinGecko API key.

## Usage

To start the server:

```
yarn run dev
```

The server will start on `http://localhost:3000` (or the port specified in your .env file).

## API Endpoints

### Get Latest Statistics

- **URL**: `/stats`
- **Method**: `GET`
- **Query Parameters**:
  - `coin`: (required) One of `bitcoin`, `ethereum`, or `matic-network`
  - `currency`: (optional) Either `usd` or `inr`. Defaults to `usd` if not specified.
- **Success Response**:
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "price": 40000,
      "marketCap": 800000000,
      "24hChange": 3.4
    }
    ```

### Get Price Deviation

- **URL**: `/deviation`
- **Method**: `GET`
- **Query Parameters**:
  - `coin`: (required) One of `bitcoin`, `ethereum`, or `matic-network`
  - `currency`: (optional) Either `usd` or `inr`. Defaults to `usd` if not specified.
- **Success Response**:
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "deviation": 4082.48
    }
    ```

## Error Handling

The API uses the following error codes:

- **400 Bad Request**: Invalid input parameters
- **404 Not Found**: Data not found for the specified coin
- **500 Internal Server Error**: Server error

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- [CoinGecko API](https://www.coingecko.com/en/api/documentation) for providing cryptocurrency data
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [node-cron](https://github.com/node-cron/node-cron)
- [Zod](https://github.com/colinhacks/zod)