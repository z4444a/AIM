package ru.relex.aim.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import ru.relex.aim.security.filter.AuthenticationFilter;
import ru.relex.aim.security.filter.JwtAccessFilter;
import ru.relex.aim.security.filter.JwtRefreshFilter;
import ru.relex.aim.security.service.ITokenService;
import ru.relex.aim.security.service.IUserSecurityService;
import ru.relex.aim.security.service.impl.MasterProvider;

import java.util.List;
import java.util.Map;

/**
 * It is configuration class which is used to join
 * {@link AuthenticationFilter}, {@link JwtAccessFilter}
 * and {@link JwtRefreshFilter} with default filter chain.
 * Also this class finds components in current module.
 *
 * @author Sorokin Georgy
 */
@Configuration
@ComponentScan("ru.relex.aim.security")
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  private final UserDetailsService service;

  private final JwtAccessFilter accessFilter;

  private final AuthenticationSuccessHandler successHandler;

  private final AuthenticationFailureHandler failureHandler;

  private final ITokenService tokenService;

  private final IUserSecurityService userService;

  private final AuthenticationProvider ldapProvider;

  /**
   * Constructor.
   * Instantiates Security config.
   * Params used to provide security configuration by Spring Framework.
   */
  public SecurityConfig(UserDetailsService service,
                        JwtAccessFilter accessFilter,
                        AuthenticationSuccessHandler successHandler,
                        AuthenticationFailureHandler failureHandler,
                        ITokenService tokenService,
                        IUserSecurityService userService,
                        AuthenticationProvider ldapProvider) {
    super();
    this.service = service;
    this.accessFilter = accessFilter;
    this.successHandler = successHandler;
    this.failureHandler = failureHandler;
    this.tokenService = tokenService;
    this.userService = userService;
    this.ldapProvider = ldapProvider;
  }

  /**
   * return {@link PasswordEncoder} bean, used to create
   * and authenticate first user in the system.
   */
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }


  @Override
  protected void configure(final AuthenticationManagerBuilder auth) {
    final var dao = new MasterProvider(userService);
    dao.setPasswordEncoder(passwordEncoder());
    dao.setUserDetailsService(service);
    auth.authenticationProvider(dao);
    auth.authenticationProvider(ldapProvider);
    auth.eraseCredentials(false);
  }

  @Override
  protected void configure(final HttpSecurity http) throws Exception {
    final var refresh = new JwtRefreshFilter(authenticationManager(), successHandler, tokenService, userService);
    http.csrf().disable()
        .cors().configurationSource(corsConfigurationSource())
        .and()
        .sessionManagement().disable()
        .authorizeRequests()
        .antMatchers(Url.LOGIN).not().authenticated()
        .antMatchers(Url.REFRESH).not().authenticated()
        .antMatchers(Url.INITIALIZE).permitAll()
        .anyRequest().authenticated()
        .and()
        .addFilter(new AuthenticationFilter(successHandler, failureHandler, authenticationManager()))
        .addFilterBefore(accessFilter, AuthenticationFilter.class)
        .addFilterBefore(refresh, JwtAccessFilter.class);
  }

  private CorsConfigurationSource corsConfigurationSource() {
    final var source = new UrlBasedCorsConfigurationSource();
    final var corsConfig = new CorsConfiguration();
    corsConfig.setAllowedMethods(List.of("GET", "POST", "DELETE", "PUT", "OPTIONS"));
    corsConfig.addAllowedOrigin("*");
    corsConfig.setAllowedHeaders(List.of("*"));
    source.setPathMatcher(new AntPathMatcher());
    source.setCorsConfigurations(Map.of("/**", corsConfig));
    return source;
  }
}
