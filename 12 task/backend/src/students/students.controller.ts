import { Body, Controller, Get, Param, Post, Delete, Put } from '@nestjs/common';
import { AddStudentDto } from './dto/add-student.dto';
import { ChangeStudentDto } from './dto/change-student.dto';
import { StudentsService } from './students.service';
import { Student } from './schemas/student.schema';

@Controller('students')
export class StudentsController {

	constructor(private readonly studentsService: StudentsService) {}
	
	@Get()
	getAll(): Promise<Student[]> {
		return this.studentsService.getAll();
	}

	@Get(':id')
	getOneById(@Param('id') id: Number): Promise<Student> {
		return this.studentsService.getOneById(id);
	}

	@Post()
	add(@Body() addStudentDto: AddStudentDto): Promise<Student> {
		return this.studentsService.add(addStudentDto);
	}

	@Delete(':id')
	remove(@Param('id') id: Number): Promise<Student> {
		return this.studentsService.remove(id);
	}

	@Put(':id')
	change(@Body() changeStudentDto: ChangeStudentDto, @Param('id') id: Number): Promise<Student> {
		return this.studentsService.change(id, changeStudentDto);
	}

}
