package com.gn.agencies.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/weather")
@CrossOrigin(origins = "http://localhost:3000")
public class WeatherController {

    private final String API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";

    @GetMapping
    public Map<String, Object> getWeather(
            @RequestParam(value = "latitude", required = false) Double latitude,
            @RequestParam(value = "longitude", required = false) Double longitude,
            @RequestParam(value = "city", required = false) String city) {

        String url;
        if (city != null) {
            url = String.format("https://api.openweathermap.org/data/2.5/weather?q=%s&appid=%s&units=metric", city, API_KEY);
        } else if (latitude != null && longitude != null) {
            url = String.format("https://api.openweathermap.org/data/2.5/weather?lat=%f&lon=%f&appid=%s&units=metric", latitude, longitude, API_KEY);
        } else {
            throw new IllegalArgumentException("Either city or latitude/longitude must be provided.");
        }

        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);

        Map<String, Object> result = new HashMap<>();
        result.put("city", response.get("name"));
        Map<String, Object> main = (Map<String, Object>) response.get("main");
        result.put("temperature", main.get("temp"));
        result.put("humidity", main.get("humidity"));
        Map<String, Object> weather = ((List<Map<String, Object>>) response.get("weather")).get(0);
        result.put("weather", weather.get("description"));

        return result;
    }
}
