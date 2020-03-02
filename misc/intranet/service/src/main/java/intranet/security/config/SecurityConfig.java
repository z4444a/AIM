package intranet.security.config;

import intranet.db.repository.UserRepository;
import intranet.security.filter.AuthenticationFilter;
import intranet.security.service.IRestService;
import intranet.security.service.ITokenService;
import intranet.security.service.impl.MappingService;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;
import java.util.Map;

/**
 * Configuration.
 *
 * @author Sorokin Georgy
 */
@Configuration
@ComponentScan("intranet.security")
@EnableWebSecurity
@EnableConfigurationProperties(Intranet.class)
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final AuthenticationProvider ldapProvider;
    private final MappingService mapper;
    private final ITokenService tokenService;
    private final UserRepository repository;
    private final IRestService restService;
    private final Intranet config;

    /**
     * Constructor.
     * Instantiates Security config.
     * Params used to provide security configuration by Spring Framework.
     */
    public SecurityConfig(AuthenticationProvider ldapProvider,
                          MappingService mapper,
                          ITokenService tokenService,
                          UserRepository repository,
                          IRestService restService,
                          Intranet config) {
        super();
        this.ldapProvider = ldapProvider;
        this.mapper = mapper;
        this.tokenService = tokenService;
        this.repository = repository;
        this.restService = restService;
        this.config = config;
    }

    @Override
    protected void configure(final AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(ldapProvider);
    }

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        final var manager = authenticationManager();
        final var filter = new AuthenticationFilter(mapper, tokenService, repository, manager, restService, config);
        http.csrf().disable()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .authorizeRequests()
                .antMatchers("/").authenticated()
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
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
