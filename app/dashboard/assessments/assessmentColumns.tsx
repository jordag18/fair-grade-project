/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import { DataTableColumnHeaderRotated } from "@/components/DataTable/DataTableColumnHeaderRotated";
import { CustomColumnDef } from "@/components/DataTable/DataTable";
import { AssessmentType, AssessmentSkill } from "./AssessmentClientPage";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Instrument } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  CreateOrUpdateAssessment,
  deleteAssessment,
} from "@/components/Assessments/AssessmentServerActions";

export const assessmentColumns: (props: {
  handleFieldChange: (
    rowIndex: number,
    field: "InstrumentID" | "AssessedUserID",
    value: string
  ) => void;
  refreshAssessments: () => void;
  changedAssessments: Record<
    number,
    { instrumentChanged: boolean; userChanged: boolean }
  >;
  courseSkills: AssessmentSkill[];
  instruments: Instrument[];
  students: any[];
  isStudent?: boolean;
  userID: string;
}) => CustomColumnDef<AssessmentType>[] = ({
  handleFieldChange,
  refreshAssessments,
  changedAssessments,
  courseSkills,
  instruments,
  students,
  isStudent = false,
  userID,
}) => {
  // Basic columns for instrument, assessment date, etc.
  const basicColumns: CustomColumnDef<AssessmentType>[] = [
    {
      accessorKey: "Instrument_Assessment",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Instrument"
          className="text-center flex items-center justify-center w-24 pl-7"
        />
      ),
      accessorFn: (row) => row.Instrument_Assessment?.Name || "", // Define how to access the nested property for filtering
      cell: ({ row }) => {
        // Access the form context to handle state updates
        const { setValue, getValues } = useFormContext();

        // Extract properties from the nested Instrument_Assessment object
        const instrument = row.original.Instrument_Assessment;
        const isDisabled = isStudent && row.original.AssessorID !== userID;

        return (
          <div>
            <Select
              onValueChange={async (value) => {
                // Set the InstrumentID in the form state when the value changes
                setValue(`assessments.${row.index}.InstrumentID`, value);
                handleFieldChange(row.index, "InstrumentID", value);
                await CreateOrUpdateAssessment(row.original);
              }}
              disabled={isDisabled}
              defaultValue={getValues(`assessments.${row.index}.InstrumentID`)}
            >
              <SelectTrigger className="w-full">
                {/* Display the currently selected instrument name */}
                <SelectValue
                  placeholder={instrument?.Name || "Select an instrument"}
                />
              </SelectTrigger>
              <SelectContent>
                {instruments.map((instrument) => (
                  <SelectItem
                    key={instrument.InstrumentID}
                    value={instrument.InstrumentID}
                  >
                    {instrument.InstrumentName}{" "}
                    {/* Display the Instrument Name */}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      },
      // Define the filtering logic using the nested name
      filterFn: (row, columnId, filterValue) => {
        const instrumentName: string = row.getValue(columnId);
        return instrumentName.toLowerCase().includes(filterValue.toLowerCase());
      },
    },
    {
      accessorKey: "AssessmentDate",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Date"
          className="text-center flex items-center justify-center w-14 pl-6"
        />
      ),
      cell: ({ row }) => {
        const { setValue, watch } = useFormContext();

        const assessmentDate = watch(`assessments.${row.index}.AssessmentDate`);

        const formattedDate = assessmentDate
          ? new Date(assessmentDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
            })
          : "";

        return (
          <input
            type="text"
            value={formattedDate}
            disabled={true}
            onChange={async (e) => {
              // Combine the selected date with the existing time or use current time if none exists
              const selectedDate = e.target.value;

              const existingTime = assessmentDate
                ? new Date(assessmentDate).toISOString().split("T")[1]
                : "00:00:00.000Z";

              // Create a new ISO string combining the date and the existing or default time
              const newDateTime = new Date(
                `${selectedDate}T${existingTime}`
              ).toISOString();

              // Update the date in the form context
              setValue(`assessments.${row.index}.AssessmentDate`, newDateTime, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });

              await CreateOrUpdateAssessment(row.original);
            }}
            className="w-14 border border-gray-300 rounded p-1 text-center items-center justify-center"
          />
        );
      },
    },
    {
      accessorKey: "Assessor",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Assessor"
          className="text-center flex items-center justify-center w-20 pl-7"
        />
      ),
      cell: ({ row }) => {
        const { setValue, watch } = useFormContext();

        const assessor = watch(`assessments.${row.index}.Assessor`);

        // Function to get the initials of the assessor's name
        const getInitials = (name: string) => {
          if (!name) return "";
          const names = name.split(" ");
          const firstInitial = names[0]?.[0] || "";
          const lastInitial =
            names.length > 1 ? names[names.length - 1][0] : "";
          return `${firstInitial}${lastInitial}`.toUpperCase();
        };

        return (
          <input
            type="text"
            value={getInitials(assessor) || ""}
            onChange={(e) => {
              setValue(`assessments.${row.index}.Assessor`, e.target.value);
            }}
            className="w-14 border border-gray-300 rounded p-1 text-center items-center justify-center"
            disabled
          />
        );
      },
    },
    {
      accessorKey: "Comment",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Comment"
          className="text-center flex items-center justify-center w-24 pl-16"
        />
      ),
      cell: ({ row }) => {
        const { register, setValue, getValues } = useFormContext();
        const isDisabled = isStudent && row.original.AssessorID !== userID;
        const handleSave = async () => {
          const assessments = getValues("assessments");
          const assessment = assessments[row.index];
          try {
            const response = await CreateOrUpdateAssessment(assessment);
            if (response.success) {
              console.log("Assessment saved successfully", assessment);
            } else {
              console.error("Failed to save assessment:", response.error);
            }
          } catch (error) {
            console.error("Error saving assessment:", error);
          }
        };

        const { ref, onChange, ...inputProps } = register(
          `assessments.${row.index}.Comment`,
          {
            onChange: async (e) => {
              setValue(`assessments.${row.index}.Comment`, e.target.value, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });

              console.log("Comment value: ", e.target.value);
            },
            onBlur: handleSave,
          }
        );

        return (
          <div className="flex items-center justify-center h-full">
            <Textarea
              {...inputProps}
              disabled={isDisabled}
              ref={ref}
              className="w-32 h-10 border border-gray-300 rounded text-center"
            />
          </div>
        );
      },
    },
  ];
  // Sort the courseSkills array alphabetically by SkillName
  const sortedCourseSkills = [...courseSkills].sort((a, b) =>
    a.SkillName.localeCompare(b.SkillName)
  );
  // Dynamically add columns for each skill
  const skillColumns: CustomColumnDef<AssessmentType>[] =
    sortedCourseSkills.map((skill) => ({
      accessorKey: skill.SkillID, // Unique key for each skill
      header: ({ column }) => (
        <DataTableColumnHeaderRotated
          column={column}
          title={skill.SkillName}
          className="w-2 pb-7"
        />
      ),
      headerAlign: "top",
      cell: ({ row }) => {
        const { setValue, getValues, watch } = useFormContext();

        const isDisabled = isStudent && row.original.AssessorID !== userID;

        // Watch the current value of the adjusted score for this skill
        const assessmentSkills = watch(`assessments.${row.index}.Skills`) || [];

        // Find the matching skill in the assessmentSkills list
        const matchingSkill = assessmentSkills.find(
          (s: any) => s.SkillID === skill.SkillID
        );

        // Get the current adjusted score or default to 0
        const adjustedScore = matchingSkill?.Score ?? 0;

        const handleScoreChange = async (
          e: React.ChangeEvent<HTMLInputElement>
        ) => {
          let updatedScore = parseInt(e.target.value, 10);

          // Restrict input to 0, 1, 2, or 3
          if (isNaN(updatedScore) || updatedScore < 0 || updatedScore > 3) {
            updatedScore = adjustedScore; // Fallback to previous valid score if input is invalid
          }

          console.log("Field Changed with score:", updatedScore);

          // Find the skill index in the Skills array
          const skillIndex = assessmentSkills.findIndex(
            (s: any) => s.SkillID === skill.SkillID
          );

          // If the skill does not exist, add it to the list
          if (skillIndex === -1) {
            const newSkill = {
              SkillID: skill.SkillID,
              SkillName: skill.SkillName,
              Score: updatedScore,
              approved: true,
              initialScore: 0,
              adjustedScore: updatedScore,
            };
            setValue(`assessments.${row.index}.Skills`, [
              ...assessmentSkills,
              newSkill,
            ]);
          } else {
            // Update the skill score in the form state if the skill is found
            setValue(
              `assessments.${row.index}.Skills.${skillIndex}.Score`,
              updatedScore
            );
            if (!isStudent) {
              setValue(
                `assessments.${row.index}.Skills.${skillIndex}.approved`,
                true
              );
            }
          }

          await CreateOrUpdateAssessment(row.original);
        };

        return (
          <div>
            <input
              type="number"
              value={adjustedScore}
              onChange={handleScoreChange}
              disabled={isDisabled}
              onFocus={(e) => e.target.select()}
              min={0}
              max={3}
              step={1}
              className="w-[30px] border border-gray-300 rounded text-center items-center justify-center"
            />
          </div>
        );
      },
    }));

  const actionsColumn: ColumnDef<AssessmentType> = {
    id: "actions",
    cell: ({ row }) => (
      <button
        onClick={async () => {
          deleteAssessment(row.original.AssessmentID);
          console.log("Row Data:", row.original);
        }}
        className="text-blue-600 hover:text-blue-900"
      >
        Delete
      </button>
    ),
  };
  if (isStudent) {
    return [...basicColumns, ...skillColumns];
  } else {
    return [...basicColumns, ...skillColumns];
  }
};
