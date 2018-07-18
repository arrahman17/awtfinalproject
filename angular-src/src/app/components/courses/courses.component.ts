import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
    courses;
    showSessions = false;
    activeCourseId;
    passKey: string;
    errorMessage: string;
    currentUser = JSON.parse(localStorage.getItem('user'));

    constructor(
        public http: HttpClient,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.activeCourseId = this.route.snapshot.paramMap.get('id');
        if (!this.activeCourseId) {
            this.getCourses();
        } else {
            this.getCourseSessions(this.activeCourseId);
        }
    }

    addCourses(submittedData) {
        const url = '/api/courses/add';
        this.http.post(url, submittedData, { headers: { 'Content-Type': 'application/json' } }).subscribe(result => {
            console.log(result);
        });
    }

    checkPassKey(course) {
        if (course.passKey === this.passKey) {
            course.passKey = '';
        } else {
            this.errorMessage = 'The passkey is wrong';
        }
    }

    getCourseSessions(id) {
        const url = '/api/courses/?id=';
        this.http.get(url + id).subscribe(result => {
            localStorage.setItem('course', JSON.stringify(result));
            this.courses = result;
        });
    }

    getCourses() {
        const url = '/api/courses/getall';
        this.http.get(url).subscribe(result => {
            this.courses = result;
        });
    }
}
