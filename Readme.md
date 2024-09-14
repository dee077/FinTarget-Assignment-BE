# Node Assignment: User Task Queuing with Rate Limiting

This project demonstrates a rate-limited task processing API built with Node.js, Express, Redis, and clustering. It includes rate-limiting at two levels:
- **Per Request**: Limits the number of requests per second per user.
- **Per Minute**: Allows up to 20 requests per minute per user.


## Implementation:

1. **Node.js Application**:  
   Created a basic Node.js app with an Express API endpoint `/api/tasks` to handle task submissions.

2. **BullMQ for Queue**:  
   Used **BullMQ** to manage task queues and handle delayed task execution with Redis for storage.

3. **Rate Limiting**:  
   Implemented API rate limiting using Redis to control user requests and apply delays when limits are exceeded.

4. **Delay Calculation**:  
   Calculated delays dynamically using redis keys and used BullMQ to queue tasks for delayed execution based on rate limits.

5. **Docker Setup**:  
   Deployed **Redis** and **Redis Commander** using Docker for seamless environment setup and Redis management.

6. **Test Cases**:  
   Wrote tests to validate task submission, delay handling, and rate limit functionality.


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
