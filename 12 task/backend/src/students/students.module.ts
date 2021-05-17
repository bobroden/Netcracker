import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student, StudentSchema } from './schemas/student.schema';

@ Module ({
	providers: [StudentsService],
	controllers: [StudentsController],
	imports: [
		MongooseModule.forFeature([
			{name: Student.name, schema: StudentSchema}
		])
	]
})
export class StudentsModule {

}