import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Robot } from './robot.entity';

@Injectable()
export class RobotsService {
    constructor(
        @InjectRepository(Robot)
        private robotsRepository: Repository<Robot>
    ) {}

    async findAll(): Promise<Robot[]> {
        const robots= await this.robotsRepository.find();
        console.log('Fetched robots:', robots);
        return robots;

    }

    async findOne(id: string): Promise<Robot> {
        const robot = await this.robotsRepository.findOneBy({ id });
        if (!robot) {
            throw new NotFoundException(`Robot with ID "${id}" not found`);
        }
        return robot;
    }

    async findOneByName(name: string): Promise<Robot> {
        const robot = await this.robotsRepository.findOneBy({ name });
        if (!robot) {
            throw new NotFoundException(`Robot with name "${name}" not found`);
        }
        return robot;
    }

    create(robot: Partial<Robot>): Promise<Robot> {
        const newRobot = this.robotsRepository.create(robot);
        return this.robotsRepository.save(newRobot);
    }

    async update(id: string, robot: Partial<Robot>): Promise<Robot> {
        await this.robotsRepository.update(id, robot);
        const updatedRobot = await this.robotsRepository.findOneBy({ id });
        if (!updatedRobot) {
            throw new NotFoundException(`Robot with ID "${id}" not found`);
        }
        return updatedRobot;
    }

    async remove(id: string): Promise<void> {
        const result = await this.robotsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Robot with ID "${id}" not found`);
        }
    }
}