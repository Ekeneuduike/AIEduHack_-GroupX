package com.x.ai.powered.personalized.learning.platform.repo;

import com.x.ai.powered.personalized.learning.platform.doa.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepo extends JpaRepository<Student,String> {
    Optional<Student> findByemail(String email);
}
