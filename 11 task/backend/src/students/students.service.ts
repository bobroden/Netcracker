import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AddStudentDto } from './dto/add-student.dto';
import { ChangeStudentDto } from './dto/change-student.dto';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './schemas/student.schema';

@Injectable()
export class StudentsService {

	constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) {}

	async getAll(): Promise<Student[]> {
		return this.studentModel.find().exec();
	}

	async getOneById(id: Number): Promise<Student> {
		return this.studentModel.findById(id);
	}

	async add(studentDto: AddStudentDto): Promise<Student> {
		const newStudent = new this.studentModel(studentDto);
		return newStudent.save();
	}

	async remove(id: Number): Promise<Student> {
		return this.studentModel.findByIdAndRemove(id);
	}

	async change(id: Number, studentDto: ChangeStudentDto): Promise<Student> {
		return this.studentModel.findByIdAndUpdate(id, studentDto);
	}
}