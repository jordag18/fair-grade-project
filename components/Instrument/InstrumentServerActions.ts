"use server";
import prisma from "@/lib/prisma";
import { Skill } from "@/types";

interface Instrument {
    InstrumentID: string;
    InstrumentName: string;
    CreatedBy: string;
    CourseID: string;
    Skills: Skill[];
    CreatedAt: Date;
    UpdatedAt: Date;
  }


async function createInstrument(instrumentData: {
    name: string;
    createdBy: string;
    courseID: string;
    skills: string[]; // Array of skill IDs
  }) {
    try {
      const newInstrument = await prisma.instrument.create({
        data: {
          Name: instrumentData.name,
          CreatedBy: instrumentData.createdBy,
          CourseID: instrumentData.courseID,
          Skills: {
            connect: instrumentData.skills.map(skillID => ({ SkillID: skillID })),
          },
        },
      });
      return { success: true, instrument: newInstrument };
    } catch (error) {
      console.error("Error creating instrument:", error);
      return { success: false, error: "Failed to create instrument" };
    }
  }

  export async function fetchInstrumentsByCourse(courseID: string): Promise<Instrument[]> {
    try {
      const instruments = await prisma.instrument.findMany({
        where: { CourseID: courseID },
        include: {
          Skills: {
            select: {
              SkillID: true,
              SkillName: true, // Include SkillName
              SkillType: true, // Include SkillType
            }
          },
        },
      });
  
      return instruments.map(instrument => ({
        InstrumentID: instrument.InstrumentID,
        InstrumentName: instrument.Name, // Adjusted field name
        CreatedBy: instrument.CreatedBy,
        CourseID: instrument.CourseID,
        Skills: instrument.Skills.map(skill => ({
          SkillID: skill.SkillID,
          SkillName: skill.SkillName, // Ensure SkillName is included
          SkillType: skill.SkillType, // Ensure SkillType is included
        })),
        CreatedAt: instrument.CreatedAt,
        UpdatedAt: instrument.UpdatedAt,
      }));
    } catch (error) {
      console.error("Error fetching instruments:", error);
      throw new Error("Failed to fetch instruments");
    }
  }