# Node Assignment: User Task Queuing with Rate Limiting

This project demonstrates a rate-limited task processing API built with Node.js, Express, Redis, and clustering. It includes rate-limiting at two levels:
- **Per Request**: Limits the number of requests per second per user.
- **Per Minute**: Allows up to 20 requests per minute per user.


## Implementation:

- **Rate Limiting**: Protects the API from being overwhelmed by limiting requests at two levels: per second and per minute.
- **Task Queue**: Processes incoming tasks asynchronously using Redis, decoupling task execution from API requests.
- **Clustering**: Utilizes Node.js `cluster` to scale the application across multiple CPU cores, enhancing the performance of the application under heavy loads.
- **Redis Integration**: Handles both rate-limiting and task queue management, leveraging Redis as the primary data store.
- **Logging**: Logs task processing details to `logs.txt` to provide insights into task handling and system performance.
- **Testing**: Comprehensive tests are written using the **Jest** testing framework and **Supertest** for API testing.

## Installation and Setup

Follow these steps to get the project running locally:

### Prerequisites:

- Node.js (v14 or higher)
- Redis (running locally or in Docker)
- Docker (if you want to run Redis in a container)


### Steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/dee077/FinTarget-Assignment-BE
   cd FinTarget-Assignment-BE
   ```

2. **Install Dependencies:**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:

   ```bash
   PORT=5000
   REDIS_HOST=redis
   REDIS_PORT=6379
   NO_OF_WORKER_PROCESSES=2
   ```

   
4. **Build and Run the Application with Docker Compose**:

   To build your docker app only first time:
   ```bash
   docker-compose up --build -d
   ```

   Afterwords:
   ```bash
   docker-compose up -d
   ```

5. **Access Application**

   - `Node Web App`Your app is running inside the Docker container and is mapped to `http://localhost:5000`.
   - `Redis Commander` access and see redis key for queue and rate limits at `http://localhost:8081`

### Run Tests

   Go Inside Docker Container and run npm test
   ```bash
   docker-compose exec app npm test
   ```


### Endpoints

#### POST `/task`

- **Description**: Adds a task to the queue for processing.
- **Request Body**:
  ```json
  {
    "userId": "user123"
  }
  ```

## Submission

I have completed the assignment as per the given requirements and it is ready for submission. <br>
Thank you! <br>
Deepanshu Sahu
