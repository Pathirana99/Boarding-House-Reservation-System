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
    private final JwtFilter jwtFilter;
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
/*
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/SignInUser/SignIn").permitAll()
                        .requestMatchers("/loginuser/saveLoginUser").hasRole("OWNER")

                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

 */
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity, consider enabling in production
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/SignInUser/SignIn",
                            "/boardingHouse/saveBoarding",
                            "/loginuser/saveLoginUser",
                            "/owner/saveOwner",
                            "/boardingHouse/{ownerId}/houses",
                            "/owner/{ownerId}/houses",
                            "/boardingHouse/getAllBoarding",
                            "/boardingHouse/city/{city}",
                            "/boardingHouse/{id}/updateBoarding").permitAll()
                   //.requestMatchers("/boardingHouse/{id}/updateBoarding").permitAll()
                   // .requestMatchers("/loginuser/saveLoginUser").hasRole("USER")// Allow unauthenticated access to this endpoint
                    .anyRequest().authenticated() // All other requests require authentication
            )
            /*
            .formLogin(form -> form
                    .loginPage("/login") // Specify custom login page if necessary
                    .permitAll()         // Allow access to login page
            )

             */
            .formLogin(Customizer.withDefaults())
            .httpBasic(Customizer.withDefaults());

    return http.build();
}
    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.withUsername("user")
                .password(passwordEncoder().encode("password"))
                .roles("USER")
                .build();

        UserDetails admin = User.withUsername("admin")
                .password(passwordEncoder().encode("admin"))
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(user, admin);
    }
}