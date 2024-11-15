# PlacesAPI-SyncTool

**PlacesAPI-SyncTool** is a Node.js utility for seamlessly updating and enriching place data in a PostgreSQL database with real-time data from the Google Places API. This tool is designed for applications needing accurate and updated location data, automating retrieval and synchronization of address components, plus codes, and place types at scheduled sleep intervals.

## Features

- **Automated Google Places API Fetching**: Periodically fetch data from Google Places API for existing places based on `place_id`.
- **Data Enrichment**: Retrieve detailed `address_components`, `plus_code`, and `types` fields and sync with your PostgreSQL records.
- **Interval-based API Calls**: Configure sleep intervals (e.g., 300 miliseconds) to control API requests and avoid rate limits.
- **Seamless Database Integration**: Works with PostgreSQL for smooth integration and updating of place records.

## Getting Started

### Prerequisites

- **Node.js** (v20 or higher recommended)
- **PostgreSQL** database
- **Google Places API Key**

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/a-darul/PlacesAPI-SyncTool.git
   cd PlacesAPI-SyncTool
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Configure Environment Variables**

   Create a _.env_ file in the root of your project to store sensitive information:

   ```bash
   GOOGLE_API_KEY=XXyour_google_places_api_keyXX
   DATABASE_URL=postgres://user:password@host:5432/database
   ```

### Usage

To start syncing data, simply run:

```bash
   npm start
```

This command will initialize the interval-based fetcher to retrieve data from the Google Places API every 300 miliseconds (default setting).

### Configuration

Modify the sleep interval setting and other parameters in the configuration file to control how frequently API calls are made. You can adjust this setting to suit your application’s needs and API quota limits.

## Workflow

1. **Retrieve Existing Places**: Fetch existing spots from your PostgreSQL table that includes _place_id_.
2. **Interval-based Fetching**: Automatically query the Google Places API every 30 seconds, using _place_id_ to get updated data.
3. **Data Update**: Update the database with the latest _address_components_, _plus_code_, and _types_ information.

## Contributing

Feel free to open issues or submit pull requests if you have ideas for improvements or find any issues!
