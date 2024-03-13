package com.markiyanova.asianhouse;

import com.markiyanova.asianhouse.model.MenuItem;
import com.markiyanova.asianhouse.model.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class OrderTest {

    @LocalServerPort
    private int port;


    @Autowired
    private TestRestTemplate restTemplate;


    private String getBaseUrl() {
        return "http://localhost:" + port + "/order/all";
    }

    @Test
    public void getOrders() {

        ResponseEntity<List<Order>> response = restTemplate.exchange(
                getBaseUrl(),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Order>>() {}
        );
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

    }

}
