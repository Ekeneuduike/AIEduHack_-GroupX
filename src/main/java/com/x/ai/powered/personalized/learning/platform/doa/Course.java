package com.x.ai.powered.personalized.learning.platform.doa;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.aop.target.LazyInitTargetSource;

import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Course {
    @jakarta.persistence.Id
    private String Id;
    private String name;
    @OneToMany
    private List<Subject> subjects;
    @OneToMany
    private List<StudyPlan> studyPLans;
}
