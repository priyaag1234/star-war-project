package com.starwars.infofinder;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class StarWarsController {

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/api/search")
    public String search(@RequestParam String type, @RequestParam String name) {
        String url = "https://swapi.dev/api/" + type + "/?search=" + name.toLowerCase();
        return restTemplate.getForObject(url, String.class);
    }
}
