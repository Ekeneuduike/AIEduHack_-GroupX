package com.x.ai.powered.personalized.learning.platform.registration;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationTokenRepo extends JpaRepository<RegistrationToken,String> {


    RegistrationToken findBytoken(String token);
}
