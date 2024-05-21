export interface Student {
    firstname:string
    lastname:string
    email:string
    age:number
    img_url:string
    id:string
    studyPlans:Studyplan[]
    courses:Course[]
    completedCourses:Course[]
}
export interface Course{
    id:string,
    name:string,
    thumbnail:any
    score:number
    subjects:Subject[]
    description:string
}
export interface CourseDto{
    id:string,
    name:string,
    thumbnail:any
    score:number
    subjects:Subject[]
    description:string
    filetype:string
}

export interface Subject{
    id:string
    name:string
    score:number
    allocated_time:number
}
export interface StudentInfo{
    id:string
    firstname:string
    lastname:string
    profile_img:any
    img_type:string
    email:string
    age:number
    completedCourses:Course[]
    enrolledCourses:Course[]
    roles:Role[]
} 

export interface Role{
    id:string
    name:string
}

export interface Studyplan{
id:string
student:Student
course:Course[]
course_time:number
level:Level
}
export enum Level{
    BEGINNER,INTERMEDIATE,ADVANCED
}
export interface CompletedCourses{
    id:string,
    course:CourseDto,
    student:Student,
    completionDate:Date
}

export interface Question{
    id:number
    name:string
    questions:string
    options:Option
    selected_option:any
    correctOption:string
}
export interface Option{
    option1:string
    option2:string
    option3:string
    option4:string
}
export interface ChatDetails{
    question:string;
    response:string;
}