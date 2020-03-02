package intranet.security.ldap;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.ldap.DefaultSpringSecurityContextSource;
import org.springframework.security.ldap.authentication.BindAuthenticator;
import org.springframework.security.ldap.authentication.LdapAuthenticationProvider;
import org.springframework.security.ldap.search.FilterBasedLdapUserSearch;
import org.springframework.security.ldap.userdetails.DefaultLdapAuthoritiesPopulator;

/**
 * Allows access to ldap.
 *
 * @author Sorokin Georgy
 */
@Configuration
@EnableConfigurationProperties(Ldap.class)
public class LdapConfig {

    private final Ldap ldap;

    /**
     * Constructor.
     * All parameters are required.
     *
     * @param ldap contains properties for access to ldap
     */
    public LdapConfig(Ldap ldap) {
        this.ldap = ldap;
    }

    /**
     * Allows spring to configure ldap authentication
     * using ldap properties from {@link Ldap}.
     *
     * @return provider which is used to authenticate ldap user
     */
    @Bean
    public AuthenticationProvider ldapProvider() {
        final DefaultSpringSecurityContextSource context = new DefaultSpringSecurityContextSource(ldap.getHost());
        context.setUserDn(ldap.getUserBase());
        context.setPassword(ldap.getPassword());
        context.afterPropertiesSet();
        final var ldapUserSearch = new FilterBasedLdapUserSearch(ldap.getSearchbase(), "(uid={0})", context);
        final BindAuthenticator bindAuthenticator = new BindAuthenticator(context);
        bindAuthenticator.setUserSearch(ldapUserSearch);
        final var populator = new DefaultLdapAuthoritiesPopulator(context, ldap.getSearchbase());
        return new LdapAuthenticationProvider(bindAuthenticator, populator);
    }
}
