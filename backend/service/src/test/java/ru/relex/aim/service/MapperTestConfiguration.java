package ru.relex.aim.service;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.ComponentScan;

/**
 * @author Nikita Skornyakov
 * @date 11.06.2019
 */
@TestConfiguration
@ComponentScan(basePackages = {"ru.relex.aim.service.mapper"})
public class MapperTestConfiguration {
}
