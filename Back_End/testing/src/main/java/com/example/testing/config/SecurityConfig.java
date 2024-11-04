package com.example.testing.config;

import com.example.testing.service.SignInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    JwtFilter jwtFilter;
    @Autowired
    private final SignInService signInService;

    public SecurityConfig(JwtFilter jwtFilter, SignInService signInService) {
        this.jwtFilter = jwtFilter;
        this.signInService = signInService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(signInService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .authenticationProvider(authenticationProvider())
                .build();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF, consider enabling it in production
                .cors(cors -> cors.disable()) // Disable CORS for now; configure if needed
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/loginuser/saveLoginUser", "/SignInUser/SignIn","/loginuser/getAllLoginuser","/loginuser/{id}","/loginuser/forgotPassword", "/loginuser/resetPassword","/loginuser/password/","/ratings/submit","/loginuser/{id}/updatePassword",
                                "/boardingHouse/saveBoarding", "/saveOwnerWithHousesAndRooms/{loginUserId}",
                                "/boardingHouse/{ownerId}/houses", "/owner/{ownerId}/houses",
                                "/boardingHouse/getAllBoarding", "/boardingHouse/{id}/updateBoarding",
                                "/rooms/{boardingHouseId}/room", "/rooms/getRooms").permitAll()
                        .requestMatchers("/boardingHouse/city/{city}", "/loginuser/{id}").hasRole("USER")
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/login")
                        .defaultSuccessUrl("/home", true)
                        .permitAll()
                )
                .httpBasic(Customizer.withDefaults())
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/login")
                        .defaultSuccessUrl("/home")
                        .failureUrl("/login?error=true")
                        .authorizationEndpoint(authorization -> authorization
                                .baseUri("/oauth2/authorize")
                        )
                        .redirectionEndpoint(redirection -> redirection
                                .baseUri("/login/oauth2/code/*")
                        )
                );

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.withUsername("user")
                .password(passwordEncoder().encode("password"))
                .roles("USER")
                .build();
        UserDetails owner = User.withUsername("owner")
                .password(passwordEncoder().encode("owner"))
                .roles("OWNER")
                .build();
        UserDetails admin = User.withUsername("admin")
                .password(passwordEncoder().encode("admin"))
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(user, admin, owner);
    }
    /*
    public static class CustomAuthenticationDetails extends WebAuthenticationDetails {
        public CustomAuthenticationDetails(HttpServletRequest request) {
            super(request);
        }
    }

     */

}