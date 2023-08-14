const db = require('../config/db')

class student {
        constructor(student_id, name,gender, address, email, phone, password,role, teacher_id) {
                this.student_id = student_id;
                 this.teacher_id = teacher_id;
                this.name = name;
                this.gender = gender;
                this.address = address;
                this.email = email;
                this.phone = phone;
                this.password = password;
                this.role= role;
               
        }

        async save() {
                let sql, acc ;
                if (this.role == 'student'){
                        sql = `INSERT INTO student (student_id,name,gender,address,email,phone,password,role) VALUES('${this.student_id}','${this.name}', '${this.gender}', '${this.address}','${this.email}', '${this.phone}', '${this.password}', '${this.role}')`;
                        acc = `INSERT INTO  accounct(email,password,role) VALUES ('${this.email}', '${this.password}', '${this.role}')`;
                }
                else {
                        sql = `INSERT INTO teacher(teacher_id,name,gender,address,email,phone,password,role)  VALUES('${this.teacher_id}','${this.name}', '${this.gender}', '${this.address}','${this.email}', '${this.phone}', '${this.password}', '${this.role}')`;
                        acc = `INSERT INTO  accounct(email,password,role) VALUES ('${this.email}', '${this.password}', '${this.role}')`;
                }
                return db.execute(sql) ,db.execute(acc);
        }
        static findAll() {
                let sql = "SELECT * FROM student;";

                return db.execute(sql);
        }
}

module.exports = student;