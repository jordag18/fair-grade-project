"use server";
import prisma from "@/lib/prisma";
import { InstrumentFormSchema } from "./InstrumentForm";

interface Instrument {
    InstrumentID: string;
    InstrumentName: string;
    CreatedBy: string;
    CourseID: string;
    Skills: Skill[];
    CreatedAt: Date;
    UpdatedAt: Date;
  }

  interface Skill {
    SkillID: string;
    SkillName: string;
    SkillType: string;
  }

  export async function createInstrument(instrumentData: InstrumentFormSchema) {
    try {
      const result = await prisma.$transaction(async (prisma) => {
        // Create the instrument
        const newInstrument = await prisma.instrument.create({
          data: {
            Name: instrumentData.InstrumentName,
            CreatedBy: instrumentData.CreatedBy,
            CourseID: instrumentData.CourseID,
          },
        });
  
        // Create the relationships with skills in InstrumentSkills
        if (instrumentData.Skills && instrumentData.Skills.length > 0) {
          await prisma.instrumentSkills.createMany({
            data: instrumentData.Skills.map(skill => ({
              InstrumentID: newInstrument.InstrumentID,
              SkillID: skill.SkillID,
            })),
          });
        }
  
        return newInstrument;
      });
  
      return { success: true, instrument: result };
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
            include: {
              Skills: true,
            },
          },
          User: {
            select: {
              name: true,
            },
          },
        },
      });
  
      return instruments.map(instrument => ({
        InstrumentID: instrument.InstrumentID,
        InstrumentName: instrument.Name,
        CreatedBy: instrument.User?.name || "Unknown",
        CourseID: instrument.CourseID,
        Skills: instrument.Skills.map(instrumentSkill => ({
          SkillID: instrumentSkill.Skills.SkillID,
          SkillName: instrumentSkill.Skills.SkillName,
          SkillType: instrumentSkill.Skills.SkillType,
        })),
        CreatedAt: instrument.CreatedAt,
        UpdatedAt: instrument.UpdatedAt,
      }));
    } catch (error) {
      console.error("Error fetching instruments:", error);
      throw new Error("Failed to fetch instruments");
    }
  }
  
  // Server action to delete an instrument
  export async function deleteInstrument(instrumentID: string) {
    try {
      await prisma.instrument.delete({
        where: { InstrumentID: instrumentID },
      });
      return { success: true };
    } catch (error) {
      console.error("Error deleting instrument:", error);
      return { success: false, error: "Failed to delete instrument" };
    }
  }
  
  // Server action to modify an instrument
  export async function modifyInstrumentAndReplace(instrumentData: InstrumentFormSchema) {
    try {
      await prisma.$transaction(async (prisma) => {
        // Delete the existing instrument
        await prisma.instrument.delete({
          where: { InstrumentID: instrumentData.InstrumentID },
        });
  
        // Create the new instrument
        const newInstrument = await prisma.instrument.create({
          data: {
            InstrumentID: instrumentData.InstrumentID, // Reuse the same ID or generate a new one
            Name: instrumentData.InstrumentName,
            CreatedBy: instrumentData.CreatedBy,
            CourseID: instrumentData.CourseID,
            CreatedAt: instrumentData.CreatedAt,
          },
        });
  
        // Delete existing InstrumentSkills entries for the instrument
        await prisma.instrumentSkills.deleteMany({
          where: { InstrumentID: newInstrument.InstrumentID },
        });
  
        // Create new InstrumentSkills entries
        const skills = instrumentData.Skills?.map(skill => ({
          InstrumentID: newInstrument.InstrumentID,
          SkillID: skill.SkillID,
        })) || [];
  
        if (skills.length > 0) {
          await prisma.instrumentSkills.createMany({
            data: skills,
            skipDuplicates: true, // Add this line to skip duplicates
          });
        }
      });
  
      return { success: true };
    } catch (error) {
      console.error("Error modifying instrument:", error);
      return { success: false, error: "Failed to modify instrument" };
    }
  }

  