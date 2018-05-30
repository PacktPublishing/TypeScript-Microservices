package com.polyglot.java.javamicroservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class JavaMicroserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(JavaMicroserviceApplication.class, args);
	}
}
