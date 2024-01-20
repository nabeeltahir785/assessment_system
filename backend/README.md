# Assessment Backend Repository


## Introduction

This repository contains the backend code for the Assessment platform, designed using the Laravel framework. It is responsible for handling all the server-side logic and database interactions for the assessment application.

## Getting Started

These instructions will guide you through the setup process to get the backend running on your local machine for development and testing purposes.


## Prerequisites

Before you begin, ensure you have the following installed on your system:

- PHP (version as required by the Laravel version used)
- Composer (Dependency Manager for PHP)
- A Database System (PostgreSQL)

## Installation

### Install Dependencies

```composer install```

### Set Up Laravel Passport

```php artisan passport:install```

### Run Database Migrations and Seeding

```php artisan migrate```
```php artisan db:seed```

### Start the Laravel Server

```php artisan serve ```

After completing these steps, the backend should be up and running on your local server.

## Configuration


Make sure to set your database configuration in the `.env` file.

## Usage

Once the server is running, it will listen for requests at the specified port (default is 8000). You can interact with the API endpoints as defined in the Laravel routes file.


