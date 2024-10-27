# Products

## Overview

This project is a microservices application consisting of several services including an authentication service, a products service, a payment service, and a frontend application. It utilizes Docker for containerization and Nx for managing the workspace and builds.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started) (latest version)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (latest LTS version)
- [Nx CLI](https://nx.dev/getting-started/installation) (install globally with `npm install -g nx`)

## Setup Instructions

Follow these steps to get your project up and running.

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo

docker-compose up --build 
to run redis/mongo servers

nx serve auth-service
nx serve products-service
nx serve payment-service
nx serve products-frontend

```


### Key Additions

**Known Issues and Improvements Section**: Added a section that highlights the missing types and not layzyloaded modules in the frontend and the need for shared libraries, making it clear that these are areas for improvement and also the backend missing some DTOs and types.

Feel free to modify any of the content to better fit your project’s needs!

