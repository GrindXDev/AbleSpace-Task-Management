import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import {
  Project,
  ProjectDocument,
} from "./schemas/project.schema";

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
  ): Promise<ProjectDocument> {
    const project = new this.projectModel(createProjectDto);
    return project.save();
  }

  async findAll(): Promise<ProjectDocument[]> {
    return this.projectModel
      .find()
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<ProjectDocument> {
    const project = await this.projectModel
      .findById(id)
      .exec();

    if (!project) {
      throw new NotFoundException("Project not found");
    }

    return project;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectDocument> {
    const project = await this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!project) {
      throw new NotFoundException("Project not found");
    }

    return project;
  }

  async remove(id: string): Promise<ProjectDocument> {
    const project = await this.projectModel
      .findByIdAndDelete(id)
      .exec();

    if (!project) {
      throw new NotFoundException("Project not found");
    }

    return project;
  }
}