package com.gn.agencies.service;

import com.gn.agencies.entity.Car;
import com.gn.agencies.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {
    @Autowired
    private CarRepository carRepository;

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Car saveCar(Car car) {
        return carRepository.save(car);
    }

}