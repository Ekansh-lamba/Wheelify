package com.gn.agencies;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class DatabaseInitializer {

    private static final String URL = "jdbc:mysql://localhost:3306/car_rental_db";
    private static final String USER = "root";
    private static final String PASSWORD = "adminadmin";

    public static void main(String[] args) {
        try (Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);
             Statement statement = connection.createStatement()) {

            // Create Admin table
            String createAdminTable = """
                    CREATE TABLE IF NOT EXISTS Admin (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        username VARCHAR(255) NOT NULL,
                        password VARCHAR(255) NOT NULL
                    );
                    """;
            statement.execute(createAdminTable);

            // Create Car table
            String createCarTable = """
                    CREATE TABLE IF NOT EXISTS Car (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        hourlyRate DOUBLE NOT NULL
                    );
                    """;
            statement.execute(createCarTable);

            // Create Customer table
            String createCustomerTable = """
                    CREATE TABLE IF NOT EXISTS Customer (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        email VARCHAR(255) NOT NULL,
                        address VARCHAR(255),
                        phnumber BIGINT,
                        loginId VARCHAR(255) NOT NULL,
                        password VARCHAR(255) NOT NULL
                    );
                    """;
            statement.execute(createCustomerTable);

            // Create Rental table
            String createRentalTable = """
                    CREATE TABLE IF NOT EXISTS Rental (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        car_id BIGINT NOT NULL,
                        customer_id BIGINT NOT NULL,
                        startTime DATETIME NOT NULL,
                        endTime DATETIME,
                        totalAmount DOUBLE NOT NULL,
                        FOREIGN KEY (car_id) REFERENCES Car(id),
                        FOREIGN KEY (customer_id) REFERENCES Customer(id)
                    );
                    """;
            statement.execute(createRentalTable);

            System.out.println("Tables created successfully!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
