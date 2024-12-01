# CF-Interface API  

CF-Interface is a backend service designed to scrape and provide data from **Codeforces**. This API lets you access information about contests, problems, and problem sets with ease.  

## Features  
- Fetch information on **upcoming contests**.  
- Retrieve details of a **specific contest** by its ID.  
- Access problem descriptions from Codeforces based on contest and problem IDs.  
- Explore problem sets with filtering options like tags and difficulty ratings.  
- Perform health checks on the API.  

# [API Endpoints](#api-endpoints)
  - [Routes](#routes)
  - [Contest](#contest)  
  - [Contests](#contests)  
  - [Problem](#problem)  
  - [Problem Set](#problem-set)  
  - [Health Check](#health-check)  

### Prerequisites  
- **Node.js** (version 16 or higher recommended)  
- **npm**  

### Setup  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/VishalSh20/cf-interface.git 
   cd cf-interface  
2. Install dependencies:
   ```bash
   npm install
3. Run
   ```bash
   npm run dev
